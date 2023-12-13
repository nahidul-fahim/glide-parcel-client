import useParcels from "../../../../Hooks/useParcels/useParcels";
import { MdCancel, MdChangeCircle } from "react-icons/md";
import { Link } from "react-router-dom";
import Swal from 'sweetalert2';
import useAxiosSecure from "../../../../Hooks/useAxiosSecure/useAxiosSecure";
import { useRef, useState } from "react";
import useCurrentUser from "../../../../Hooks/useCurrentUser/useCurrentUser";
import { Rating } from '@smastrom/react-rating'
import '@smastrom/react-rating/style.css'


//images + gif
const loadingGif = "https://i.ibb.co/zmckHyD/loading-Gif.gif";


const MyParcels = () => {


    // hooks and custom hooks
    const [filteredBookingStatus, setFilteredBookingStatus] = useState("all");
    const { isPending: userPending, user } = useCurrentUser();
    const [isPending, parcels, refetch] = useParcels(filteredBookingStatus);
    const axiosSecure = useAxiosSecure();
    const [deliveryMan, setDeliveryMan] = useState(null);
    const [ratingByUser, setRatingByUser] = useState(0);
    const reviewFormRef = useRef(null);


    // Loading state if no data found
    if (isPending || userPending) {
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


    // open modal fuction and set the delivery man
    const openReviewModal = id => {
        const deliveredBy = id.split(' ').shift();
        setDeliveryMan(deliveredBy);
        const modal = document.getElementById('reviewModal');
        modal.showModal();
        return modal;
    }


    // get today's date and validate for min date in the form's date picker
    const todayDate = new Date().toISOString().split('T')[0];


    // getting value from modal and send to the database
    const handleReview = e => {
        e.preventDefault();
        const form = e.target;
        const reviewer = user?.name;
        const reviewerImg = user?.photo;
        const reviewDate = todayDate;
        const rating = ratingByUser;
        const feedback = form.feedback.value;

        const reviewInfo = { deliveryMan, reviewer, reviewerImg, reviewDate, rating, feedback };

        const newReview = { rating };



        // send the review data to databse
        axiosSecure.post("/review", reviewInfo)
            .then(res => {
                if (res.data.insertedId) {
                    reviewFormRef.current.reset();
                    setRatingByUser(0);
                    refetch();
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Review done!",
                        showConfirmButton: false,
                        timer: 1500,
                    });
                    // increase review count for the deliveryman
                    axiosSecure.put(`/reviewcount/${deliveryMan}`, newReview)
                    
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

        // Close the modal after form submission
        const modal = document.getElementById('reviewModal');
        modal.close();
    }



    // hanbdle booking status filter
    const handleBookingStatus = e => {
        e.preventDefault();
        const statusType = e.target.statusType.value.toLowerCase();
        setFilteredBookingStatus(statusType);
    }

    
    if (parcels.length === 0) {
        console.log("empty")
    }



    return (
        <div className="container flex flex-col justify-center items-center gap-10 py-5">
            <h2 className="text-5xl font-heading text-third font-bold">My <span className="text-main">Parcels</span></h2>

            {/* total parcels + total cost */}
            <div className="flex flex-col justify-center items-start w-full gap-5 px-5">
                <h3 className="font-body font-semibold text-darkgray text-xl">Total parcels: <span className="text-sub">{parcels.length}</span></h3>
                <h3 className="font-body font-semibold text-darkgray text-xl">Total cost: <span className="text-sub">${totalCost}</span></h3>
            </div>


            {/* filter system */}
            <div className="w-full flex justify-start items-center">
                <form onSubmit={handleBookingStatus}
                    className="flex justify-center items-center gap-3">
                    <select name="statusType" id="statusType" defaultValue={filteredBookingStatus}
                        className="select w-full max-w-xs font-body text-darkgray rounded-[70px]">
                        <option disabled>Select booking status</option>
                        <option>All</option>
                        <option>Pending</option>
                        <option>Completed</option>
                        <option>On the way</option>
                        <option>Cancelled</option>
                    </select>

                    <input type="submit" value="Filter" className="bg-sub text-white px-4 py-1 rounded-[40px] font-medium font-body cursor-pointer" />
                </form>
            </div>




            {/* my all parcels table */}
            {
                parcels.length === 0 ?
                    <div className="flex justify-center items-center text-center font-body">
                        <p className="text-2xl text-darkgray mt-10 font-bold">Oops! No data found.</p>
                    </div>
                    :
                    <div className="w-full">
                        <div className="overflow-x-auto">
                            <table className="table">
                                {/* head */}
                                <thead>
                                    <tr className="font-body text-white text-center text-[14px] bg-third">
                                        <th>#</th>
                                        <th>Tracking ID</th>
                                        <th>Parcel type</th>
                                        <th>Booking date <br />Req. date <br />Apprx. date</th>
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

                                            {/* serial number */}
                                            <th>
                                                <p className="text-[12px] font-body font-regular">{parcel._id}</p>
                                            </th>

                                            {/* parcel type */}
                                            <td>
                                                <h4 className="font-medium font-body text-[14px] text-center">{parcel?.parcelType}</h4>
                                            </td>

                                            {/* requested date */}
                                            <td className="text-center">
                                                <h4 className="font-medium font-body text-[14px] text-center">{parcel?.bookingDate} <br /> {parcel?.reqDate} <br /> {parcel?.apprxDelvDate || "Pending"}</h4>
                                            </td>

                                            {/* delivery man */}
                                            <td className="font-body font-semibold text-[14px] text-center">
                                                {
                                                    parcel?.deliveryManId ? <h4 className="font-medium font-body text-[14px]">{parcel?.deliveryManId.split(" ").splice(1).join(" ") || "Pending"}</h4>
                                                        :
                                                        <p className="font-medium font-body text-[14px] text-[#919191]">Not assigned yet</p>
                                                }
                                            </td>

                                            {/* booking status */}
                                            <td className="font-body font-semibold text-[14px] text-center">
                                                <h4
                                                    className={`font-semibold capitalize font-body text-[14px]
                                        ${parcel?.bookingStatus === "pending" ? "text-[#ffa938]" : 'text-black'}
                                        ${parcel?.bookingStatus === "cancelled" ? "text-[#d42828]" : 'text-black'}
                                        ${parcel?.bookingStatus === "completed" ? "text-[#21883b]" : 'text-black'}
                                        ${parcel?.bookingStatus === "on the way" ? "text-[#2589db]" : 'text-black'}
                                        ${parcel?.bookingStatus === "returned" ? "text-[#8c2cda]" : 'text-black'}`}>
                                                    {parcel?.bookingStatus}
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
                                                {
                                                    parcel?.bookingStatus === "completed" ?
                                                        <button onClick={() => openReviewModal(parcel?.deliveryManId)}
                                                            className="bg-main text-white px-3 py-1 rounded-[40px] hover:bg-third duration-300">
                                                            Review
                                                        </button>
                                                        :
                                                        <button disabled
                                                            className="bg-main text-white px-3 py-1 rounded-[40px] opacity-40 cursor-not-allowed">
                                                            Review
                                                        </button>
                                                }
                                            </th>

                                            {/* payment */}
                                            <th className="font-body font-medium text-[14px]">
                                                <Link to="/dashboard/payment">                                                <button className="bg-[#a51b1b] text-white text-[14px] hover:bg-main duration-300 px-2 py-1 rounded-[20px] font-body">Payment</button>
                                                </Link>
                                            </th>
                                        </tr>)
                                    }
                                </tbody>
                            </table>


                            {/* modal showing when clicked on the review button */}
                            <dialog id="reviewModal" className="modal modal-bottom sm:modal-middle w-full">
                                <div className="modal-box flex flex-col justify-center items-center gap-3 w-full p-5">

                                    <h2 className="text-third text-3xl font-heading font-bold">Provide Review</h2>

                                    <div className="modal-action flex flex-col justify-center items-center w-full">

                                        {/* review form */}
                                        <form onSubmit={handleReview}
                                            ref={reviewFormRef}
                                            method="dialog"
                                            className="flex flex-col justify-center items-center gap-5 w-full p-3">

                                            {/* user's name */}
                                            <div className="w-full flex flex-col justify-start items-center gap-3">
                                                <label className="flex justify-start items-start w-full">
                                                    <span className="text-[18px] font-body text-black font-semibold">Your name <span className="text-[red]">*</span> </span>
                                                </label>
                                                <input type="text" readOnly name="name" id="name" value={user?.name} className="font-body font-medium w-full px-5 py-2 rounded-[40px] focus:outline-none border-[1px] border-lightgray" />
                                            </div>

                                            {/* feedback text */}
                                            <div className="w-full flex flex-col justify-start items-center gap-3">
                                                <label className="flex justify-start items-start w-full">
                                                    <span className="text-[18px] font-body text-black font-semibold">Your feedback <span className="text-[red]">*</span> </span>
                                                </label>
                                                <textarea required name="feedback" id="feedback" placeholder="Provide a feedback about the delivery man" className="font-body font-medium w-full px-5 py-3 rounded-[40px] focus:outline-none border-[1px] border-lightgray focus:border-third" />
                                            </div>

                                            {/* Rating */}
                                            <div className="w-full flex flex-col justify-start items-center gap-3">
                                                <label className="flex justify-start items-start w-full">
                                                    <span className="text-[18px] font-body text-black font-semibold">Rate the delivery man <span className="text-[red]">*</span> </span>
                                                </label>
                                                <Rating
                                                    style={{ maxWidth: 200 }}
                                                    value={ratingByUser}
                                                    onChange={setRatingByUser}
                                                    isRequired
                                                />
                                            </div>

                                            {/* assign button (form subsmission button) */}
                                            <div className="w-full flex justify-start items-center mt-1">
                                                <input type="submit" value="Review" className="w-full text-white bg-main px-5 py-2 rounded-[80px] hover:bg-third duration-500 font-body font-semibold cursor-pointer tracking-[1px]" />
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </dialog>
                        </div>
                    </div>
            }
        </div>
    );
};

export default MyParcels;