import useParcels from "../../../../Hooks/useParcels/useParcels";
import { MdCancel, MdChangeCircle } from "react-icons/md";
import { Link } from "react-router-dom";
import Swal from 'sweetalert2';
import useAxiosSecure from "../../../../Hooks/useAxiosSecure/useAxiosSecure";


//images + gif
const loadingGif = "https://i.ibb.co/zmckHyD/loading-Gif.gif";



const MyParcels = () => {

    // hooks and custom hooks
    const [isPending, parcels, refetch] = useParcels();
    const axiosSecure = useAxiosSecure();


    // Loading state if no data found
    if (isPending) {
        return <div className="h-[100vh] flex justify-center items-center"><img src={loadingGif} alt="" /></div>
    }


    // get the total cost for the price
    const totalCost = parcels.reduce((total, parcel) => total + parcel.cost, 0);


    // cancel a booking
    const handleCancel = id => {

        const bookingStatus = "cancelled";
        const cancelBooking = { bookingStatus };

        Swal.fire({
            title: "Are you sure to cancel?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#e64747",
            cancelButtonColor: "#3b3b3b",
            confirmButtonText: "Yes, cancel!",
            cancelButtonText: "Exit"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.put(`bookingstatus/${id}`, cancelBooking)
                    .then(res => {
                        if (res.data.modifiedCount > 0) {
                            Swal.fire({
                                position: "top-end",
                                icon: "success",
                                title: "Booking canceled successfully!",
                                showConfirmButton: false,
                                timer: 1500,
                            });
                            refetch();
                        }
                    })
                    .catch(error => {
                        Swal.fire({
                            position: "top-end",
                            icon: "error",
                            title: `Oops! ${error}`,
                            showConfirmButton: false,
                            timer: 4000,
                        });
                    })
            }
        });
    }




    return (
        <div className="container flex flex-col justify-center items-center gap-10 py-5">
            <h2 className="text-5xl font-heading text-third font-bold">My <span className="text-main">Parcels</span></h2>

            {/* total parcels + total cost */}
            <div className="flex flex-col justify-center items-start w-full gap-5 px-5">
                <h3 className="font-body font-semibold text-darkgray text-xl">Total parcels: <span className="text-sub">{parcels.length}</span></h3>
                <h3 className="font-body font-semibold text-darkgray text-xl">Total cost: <span className="text-sub">${totalCost}</span></h3>
            </div>


            {/* all parcels table */}
            <div className="w-full">
                <div className="overflow-x-auto">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr className="font-body text-white text-center text-[14px] bg-third">
                                <th>#</th>
                                <th>Parcel type</th>
                                <th>Req. delivery date</th>
                                <th>Apprx. del. date</th>
                                <th>Booking date</th>
                                <th>Delivery man</th>
                                <th>Booking status</th>
                                <th>Manage booking</th>
                                <th>Review</th>
                                <th>Payment</th>
                            </tr>
                        </thead>
                        <tbody>

                            {
                                parcels.map((parcel, index) => <tr key={parcel._id}>

                                    {/* serial number */}
                                    <th>
                                        {index + 1}
                                    </th>

                                    {/* parcel type */}
                                    <td>
                                        <h4 className="font-medium font-body text-[14px] text-center">{parcel.parcelType}</h4>
                                    </td>

                                    {/* requested date */}
                                    <td className="text-center">
                                        <h4 className="font-medium font-body text-[14px] text-center">{parcel.reqDate}</h4>
                                    </td>

                                    {/* approximate delivery date */}
                                    <td className="font-body font-semibold text-[14px] text-center">
                                        <h4 className="font-medium font-body text-[14px]">{parcel?.apprxDelvDate || "Pending"}</h4>
                                    </td>

                                    {/* booking date */}
                                    <td className="font-body font-semibold text-[14px] text-center">
                                        <h4 className="font-medium font-body text-[14px]">{parcel.bookingDate}</h4>
                                    </td>

                                    {/* delivery man */}
                                    <td className="font-body font-semibold text-[14px] text-center">
                                        <h4 className="font-medium font-body text-[14px]">{parcel?.deliveryManId.split(" ").splice(1).join(" ") || "Pending"}</h4>
                                    </td>

                                    {/* booking status */}
                                    <td className="font-body font-semibold text-[14px] text-center">
                                        <h4
                                            className={`font-semibold capitalize font-body text-[14px]
                                            ${parcel.bookingStatus === "pending" ? "text-[#ff9100]" : 'text-black'}
                                            ${parcel.bookingStatus === "cancelled" ? "text-[#ff0000]" : 'text-black'}
                                            ${parcel.bookingStatus === "delivered" ? "text-[#219e40]" : 'text-black'}
                                            ${parcel.bookingStatus === "on the way" ? "text-[#008cff]" : 'text-black'}
                                            ${parcel.bookingStatus === "returned" ? "text-[#8c00ff]" : 'text-black'}`}>
                                            {parcel.bookingStatus}
                                        </h4>
                                    </td>

                                    {/* manage booking */}
                                    <td className="font-body font-semibold text-[14px] flex justify-center items-center gap-3">

                                        {/* update button */}
                                        <Link to={`updatebooking/${parcel._id}`}>
                                            <button
                                                disabled={parcel.bookingStatus !== "pending"}
                                                className={`${parcel.bookingStatus !== "pending" ? 'cursor-not-allowed opacity-40' : ''}`}>
                                                <MdChangeCircle className="text-3xl rounded-full text-[#0084ff]" />
                                            </button>
                                        </Link>

                                        {/* cancel button */}
                                        <button onClick={() => handleCancel(parcel._id)}
                                            disabled={parcel.bookingStatus !== "pending"}
                                            className={`${parcel.bookingStatus !== "pending" ? 'cursor-not-allowed opacity-40' : ''}`}
                                        >
                                            <MdCancel className="text-3xl mt-[-5px] rounded-full text-[red]" />
                                        </button>
                                    </td>

                                    {/* review */}
                                    <th className="font-body font-medium text-[14px]">
                                        <button className="bg-main text-white text-[14px] hover:bg-sub duration-300 px-2 py-1 rounded-[20px] font-body">Review</button>
                                    </th>

                                    {/* payment */}
                                    <th className="font-body font-medium text-[14px]">
                                        <button className="bg-[#a51b1b] text-white text-[14px] hover:bg-main duration-300 px-2 py-1 rounded-[20px] font-body">Payment</button>
                                    </th>
                                </tr>)
                            }
                        </tbody>
                    </table>
                </div>
            </div>

        </div>
    );
};

export default MyParcels;