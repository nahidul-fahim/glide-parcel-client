import useAxiosSecure from "../../../../Hooks/useAxiosSecure/useAxiosSecure";
import useCurrentUser from "../../../../Hooks/useCurrentUser/useCurrentUser";
import useDeliveries from "../../../../Hooks/useDeliveries/useDeliveries";
import Swal from 'sweetalert2';

//images + gif
const loadingGif = "https://i.ibb.co/zmckHyD/loading-Gif.gif";


const MyDeliveryList = () => {

    //hooks and custom hooks
    const { DelieryListPending, allDeliveries, DeliveryListRefetch } = useDeliveries();
    const axiosSecure = useAxiosSecure();
    const { isPending, user } = useCurrentUser();



    // conditional loading
    if (isPending) {
        return <div className="h-[100vh] flex justify-center items-center"><img src={loadingGif} alt="" /></div>
    }
    if (DelieryListPending) {
        return <div className="h-[100vh] flex justify-center items-center"><img src={loadingGif} alt="" /></div>
    }


    // handle delivery cancel
    const handleDeliveryCancel = id => {

        const bookingStatus = "cancelled";
        const cancelBooking = { bookingStatus };

        // send the updated booking data to database
        Swal.fire({
            title: "Are you sure to cancel the booking?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#001751",
            cancelButtonColor: "#b03838",
            confirmButtonText: "Yes! Cancel!",
            cancelButtonText: "Do not cancel"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.put(`/bookingstatus/${id}`, cancelBooking)
                    .then(res => {
                        if (res.data.modifiedCount > 0) {
                            DeliveryListRefetch()
                            Swal.fire({
                                title: "Successful!",
                                text: "Cancelled the booking.",
                                icon: "success"
                            });
                        }
                    })
                    .catch(err => {
                        console.log(err.code, "||", err.message)
                    })
            }
        });
    }


    // handle delivery complete
    const handleDeliveryComplete = id => {

        const bookingStatus = "completed";
        const completeBooking = { bookingStatus };

        // send the updated booking data to database
        Swal.fire({
            title: "Have you completed the booking?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#26a858",
            cancelButtonColor: "#b03838",
            confirmButtonText: "Yes! Booking Complete!",
            cancelButtonText: "No!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.put(`/bookingstatus/${id}`, completeBooking)
                    .then(res => {
                        if (res.data.modifiedCount > 0) {
                            //update total delivery for the delivery man in the database
                            axiosSecure.put(`/totaldelivery/${user._id}`)
                            DeliveryListRefetch()
                            Swal.fire({
                                title: "Successful!",
                                text: "Completed the booking.",
                                icon: "success"
                            });
                        }
                    })
                    .catch(err => {
                        console.log(err.code, "||", err.message)
                    })
            }
        });
    }



    return (
        <div className="container flex flex-col justify-center items-center gap-10 py-5">
            <h2 className="text-5xl font-heading text-third font-bold">My <span className="text-main">Delivery List</span></h2>


            {/* all users table */}
            <div className="overflow-x-auto w-full">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr className="font-body text-white text-center text-[14px] bg-third">
                            <th>#</th>
                            <th>Booked by</th>
                            <th>Receivers name</th>
                            <th>{'Booker\'s'} phone</th>
                            <th>Req. del. date</th>
                            <th>Apprx. del. date</th>
                            <th>{'Recv\'s'} phone</th>
                            <th>{'Recv\'s'} address</th>
                            <th>Location</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            allDeliveries.map((delivery, index) => <tr key={delivery?._id}>

                                {/* serial number */}
                                <th>
                                    <p className="font-body font-regular text-darkgray">{index + 1}</p>
                                </th>

                                {/* booked by */}
                                <td>
                                    <h4 className="font-semibold font-body text-[14px] text-center">{delivery?.name}</h4>
                                </td>

                                {/* Receivers name */}
                                <td className="text-center">
                                    <h4 className="font-medium font-body text-[14px] text-center">{delivery?.recvName || "Unavailable"}</h4>
                                </td>

                                {/* booker's phone */}
                                <td className="text-center">
                                    <h4 className="font-medium font-body text-[14px] text-center">{delivery?.phone || "Unavailable"}</h4>
                                </td>

                                {/* reuested delivery date */}
                                <td className="text-center">
                                    <h4 className="font-medium font-body text-[14px] text-center">{delivery?.reqDate || "Unavailable"}</h4>
                                </td>

                                {/* Approximate delivery date */}
                                <td className="text-center">
                                    <h4 className="font-medium font-body text-[14px] text-center">{delivery?.apprxDelvDate || "Unavailable"}</h4>
                                </td>

                                {/* Receiver's phone */}
                                <td className="text-center">
                                    <h4 className="font-medium font-body text-[14px] text-center">{delivery?.recvPhone || "Unavailable"}</h4>
                                </td>

                                {/* Receiver's address */}
                                <td className="text-center">
                                    <h4 className="font-medium font-body text-[14px] text-center">{delivery?.delvAddress || "Unavailable"}</h4>
                                </td>

                                {/* View location button */}
                                <td className="font-body font-semibold text-[14px]">
                                    <button
                                        className="bg-main text-white font-body font-medium px-3 py-1 rounded-[20px] hover:bg-third duration-300">
                                        View
                                    </button>
                                </td>

                                {/* cancel delivery button */}
                                <td className="font-body font-semibold text-[14px]">
                                    {
                                        (delivery?.bookingStatus === "cancelled" || delivery?.bookingStatus === "completed") ?
                                            <h4 className="font-bold capitalize text-darkgray font-body text-[14px] text-center">{delivery?.bookingStatus || "Unavailable"}</h4>
                                            :
                                            <div className="flex justify-center items-center gap-3">
                                                {/* cancel delivery button */}
                                                <button onClick={() => handleDeliveryCancel(delivery?._id)}
                                                    className="bg-[#ad1c1c] text-white font-body font-medium px-3 py-1 rounded-[20px] hover:bg-third duration-300">
                                                    Cancel
                                                </button>

                                                {/* complete delivery button */}
                                                <button onClick={() => handleDeliveryComplete(delivery?._id)}
                                                    className="bg-[#26a858] text-white font-body font-medium px-3 py-1 rounded-[20px] hover:bg-third duration-300">
                                                    Complete
                                                </button>
                                            </div>
                                    }
                                </td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div >
    );
};

export default MyDeliveryList;