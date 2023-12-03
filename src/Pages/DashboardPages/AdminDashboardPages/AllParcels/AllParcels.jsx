import useAllParcels from "../../../../Hooks/useAllParcels/useAllParcels";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure/useAxiosSecure";
import { useState } from "react";
import Swal from 'sweetalert2';
import useAllDeliveryMan from "../../../../Hooks/useAllDeliveryMan/useAllDeliveryMan";

// images
const loadingGif = "https://i.ibb.co/zmckHyD/loading-Gif.gif";



const AllParcels = () => {

    // hooks and custom hooks
    const { isPending, allparcels, refetch } = useAllParcels();
    const axiosSecure = useAxiosSecure();
    const [managingBookingId, setManagingBookingId] = useState(null);
    const { deliveryManPending, allDeliveryMan } = useAllDeliveryMan();


    // conditional loading state
    if (isPending) {
        return <div className="h-[100vh] flex justify-center items-center"><img src={loadingGif} alt="loading gif" /></div>
    }
    if (deliveryManPending) {
        return <div className="h-[100vh] flex justify-center items-center"><img src={loadingGif} alt="loading gif" /></div>
    }


    // open modal fuction
    const openAdminModal = id => {
        setManagingBookingId(id);
        const modal = document.getElementById('adminModal');
        modal.showModal()
        return modal;
    }


    // getting value from modal and send to the database
    const handleAdminAssign = e => {
        e.preventDefault();
        const form = e.target;
        const deliveryManId = form.deliveryManId.value;
        const apprxDelvDate = form.apprxDelvDate.value;
        const bookingStatus = "on the way";

        const adminAssignInfo = { deliveryManId, apprxDelvDate, bookingStatus };


        // send the updated booking data to database
        axiosSecure.put(`/updatebyadmin/${managingBookingId}`, adminAssignInfo)
            .then(res => {
                if (res.data.modifiedCount > 0) {
                    refetch();
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Successfully updated!",
                        showConfirmButton: false,
                        timer: 1500,
                    });
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
        const modal = document.getElementById('adminModal');
        modal.close();
    }


    // get today's date and validate for min date in the form's date picker
    const todayDate = new Date().toISOString().split('T')[0];




    return (
        <div className="container flex flex-col justify-center items-center gap-10 py-5">
            <h2 className="text-5xl font-heading text-third font-bold">All <span className="text-main">Parcels</span></h2>


            {/* all parcels table */}
            <div className="w-full">
                <div className="overflow-x-auto">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr className="font-body text-white text-center text-[14px] bg-third">
                                <th>#</th>
                                <th>Name</th>
                                <th>Phone</th>
                                <th>Booking date</th>
                                <th>Req. del. date</th>
                                <th>Cost</th>
                                <th>Booking status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>

                            {
                                allparcels.map((parcel, index) => <tr key={parcel._id}>

                                    {/* serial number */}
                                    <th>
                                        {index + 1}
                                    </th>

                                    {/* Booker name */}
                                    <td>
                                        <h4 className="font-medium font-body text-[14px] text-center">{parcel.name}</h4>
                                    </td>

                                    {/* booker phone */}
                                    <td className="text-center">
                                        <h4 className="font-medium font-body text-[14px] text-center">{parcel.phone}</h4>
                                    </td>

                                    {/* booking date */}
                                    <td className="font-body font-semibold text-[14px] text-center">
                                        <h4 className="font-medium font-body text-[14px]">{parcel.bookingDate}</h4>
                                    </td>

                                    {/* requested delivery date */}
                                    <td className="font-body font-semibold text-[14px] text-center">
                                        <h4 className="font-medium font-body text-[14px]">{parcel.reqDate}</h4>
                                    </td>

                                    {/* cost */}
                                    <td className="font-body font-semibold text-[14px] text-center">
                                        <h4 className="font-medium font-body text-[14px]">${parcel.cost}</h4>
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

                                    {/* manage button (action) */}
                                    <td className="font-body font-semibold text-[14px]">
                                        <button onClick={() => openAdminModal(`${parcel._id}`)}
                                            className="bg-main text-white font-body font-medium px-3 py-1 rounded-[20px] hover:bg-third duration-300">
                                            Manage
                                        </button>
                                    </td>

                                </tr>)
                            }
                        </tbody>
                    </table>


                    {/* modal showing when clicked on the manage button */}
                    <dialog id="adminModal" className="modal modal-bottom sm:modal-middle w-full">
                        <div className="modal-box flex flex-col justify-center items-center gap-3 w-full p-5">

                            <h2 className="text-third text-3xl font-heading font-bold">Mange Parcel</h2>

                            <div className="modal-action flex flex-col justify-center items-center w-full">

                                {/* admin assign form */}
                                <form onSubmit={handleAdminAssign}
                                    method="dialog"
                                    className="flex flex-col justify-center items-center gap-5 w-full p-5">

                                    {/* Select delivery man */}
                                    <div className="w-full flex flex-col justify-start items-center gap-3">
                                        <label className="flex justify-start items-start w-full">
                                            <span className="label-text font-body text-black font-semibold">Select delivery man <span className="text-[red]">*</span> </span>
                                        </label>
                                        <select defaultValue="Select delivery man" required name="deliveryManId" id="deliveryManId" className="select select-bordered w-full focus:outline-none px-[20px] rounded-[20px] text-[16px]">
                                            <option disabled value="Select delivery man" className="text-sub">Select delivery man</option>
                                            {
                                                allDeliveryMan.map(deliveryMan =>
                                                    <option key={deliveryMan._id} value={`${deliveryMan._id} ${deliveryMan.name}`}>
                                                        {deliveryMan.name}
                                                    </option>)
                                            }
                                        </select>
                                    </div>

                                    {/* select approximate delivery date */}
                                    <div className="w-full flex flex-col justify-start items-center gap-1">
                                        <label className="label text-left w-full">
                                            <span className="label-text font-body text-black font-semibold">Approximate delivery date <span className="text-[red]">*</span></span>
                                        </label>
                                        <input type="date" min={todayDate} name="apprxDelvDate" id="apprxDelvDate" required
                                            className="w-full border-lightgray border-[1px] px-5 py-2 rounded-[20px] focus:outline-none focus:border-third font-body text-black" />
                                    </div>

                                    {/* assign button (form subsmission button) */}
                                    <div className="w-full flex justify-start items-center">
                                        <input type="submit" value="Assign" className="w-fit text-white bg-third px-5 py-2 rounded-[80px] hover:bg-main duration-500 font-body font-semibold cursor-pointer tracking-[1px]" />
                                    </div>
                                </form>
                            </div>

                        </div>
                    </dialog>

                </div>
            </div>

        </div>
    );
};

export default AllParcels;