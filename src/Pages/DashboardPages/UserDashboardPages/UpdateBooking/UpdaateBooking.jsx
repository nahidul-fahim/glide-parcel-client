import { useForm } from "react-hook-form"
import useAxiosSecure from "../../../../Hooks/useAxiosSecure/useAxiosSecure";
import { useLoaderData, useParams } from "react-router-dom";
// import { useQuery } from "@tanstack/react-query";
import Swal from 'sweetalert2';


const UpdaateBooking = () => {

    // hooks and custom hooks
    const axiosSecure = useAxiosSecure();
    // const { id } = useParams();
    const parcel = useLoaderData();


    // fetching using tanstack query
    // const { isPending, data: parcel } = useQuery({
    //     queryKey: ["parcel"],
    //     queryFn: async () => {
    //         const res = await axiosSecure.get(`/booking/${id}`)
    //         return res.data;
    //     }
    // })


    //react hook form
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()


    // Loading state if no data found
    // const loadingGif = "https://i.ibb.co/zmckHyD/loading-Gif.gif";
    // if (isPending) {
    //     return <div className="h-[100vh] flex justify-center items-center"><img src={loadingGif} alt="" /></div>
    // }


    // get all the data
    const { _id ,name, email, phone, parcelType, parcelWeight, recvName, recvPhone, delvAddress, delvDate, latitude, longitude, cost } = parcel;


    // get today's date and validate for min date in the form's date picker
    const todayDate = new Date().toISOString().split('T')[0];


    // get the value from form
    const onSubmit = data => {
        const phone = data.phone;
        const parcelType = data.parcelType;
        const recvName = data.recvName;
        const recvPhone = data.recvPhone;
        const delvAddress = data.delvAddress;
        const delvDate = data.delvDate;
        const latitude = data.latitude;
        const longitude = data.longitude;
        const bookingStatus = "pending";

        const updatedBookingInfo = { phone, parcelType, recvName, recvPhone, delvAddress, delvDate, latitude, longitude, bookingStatus };

        // send the new booking data to database
        axiosSecure.put(`/updatebooking/${_id}`, updatedBookingInfo)
            .then(res => {
                if (res.data.modifiedCount > 0) {
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
    }



    return (
        <div className="w-full flex flex-col justify-center items-center gap-10 py-5">
            <h2 className="text-5xl font-heading text-third font-bold">Update your <span className="text-main">Booking</span></h2>

            {/* Book parcel form */}
            <div className="w-full mt-5">

                <form onSubmit={handleSubmit(onSubmit)}
                    className="w-full flex flex-col justify-center items-center gap-8">

                    {/* Name field */}
                    <div className="w-full lg:w-2/3 flex flex-col justify-center items-start gap-1">
                        <label className="label">
                            <span className="label-text font-body text-black font-semibold">Your Name </span>
                        </label>
                        <input readOnly
                            className="w-full border-lightgray border-[1px] px-5 py-2 rounded-[20px] focus:outline-none focus:border-third font-body text-black"
                            defaultValue={name} />
                        {errors.name && <span className="font-body text-[14px] text-[#a12121] font-medium">This field is required</span>}
                    </div>

                    {/* email field */}
                    <div className="w-full lg:w-2/3 flex flex-col justify-center items-start gap-1">
                        <label className="label">
                            <span className="label-text font-body text-black font-semibold">Your email </span>
                        </label>
                        <input readOnly
                            className="w-full border-lightgray border-[1px] px-5 py-2 rounded-[20px] focus:outline-none focus:border-third font-body text-black"
                            defaultValue={email} />
                        {errors.email && <span className="font-body text-[14px] text-[#a12121] font-medium">This field is required</span>}
                    </div>

                    {/* phone number field */}
                    <div className="w-full lg:w-2/3 flex flex-col justify-center items-start gap-1">
                        <label className="label">
                            <span className="label-text font-body text-black font-semibold">Your phone <span className="text-[red]">*</span></span>
                        </label>
                        <input type="tel"
                            className="w-full border-lightgray border-[1px] px-5 py-2 rounded-[20px] focus:outline-none focus:border-third font-body text-black"
                            defaultValue={phone} {...register("phone", { required: true })} />
                        {errors.phone && <span className="font-body text-[14px] text-[#a12121] font-medium">This field is required</span>}
                    </div>

                    {/* Parcel type field */}
                    <div className="w-full lg:w-2/3 flex flex-col justify-center items-start gap-1">
                        <label className="label">
                            <span className="label-text font-body text-black font-semibold">Your parcel type <span className="text-[red]">*</span></span>
                        </label>
                        <input type="text" className="w-full border-lightgray border-[1px] px-5 py-2 rounded-[20px] focus:outline-none focus:border-third font-body text-black"
                            defaultValue={parcelType} {...register("parcelType", { required: true })} />
                        {errors.parcelType && <span className="font-body text-[14px] text-[#a12121] font-medium">This field is required</span>}
                    </div>

                    {/* Parcel weight field */}
                    <div className="w-full lg:w-2/3 flex flex-col justify-center items-start gap-1">
                        <label className="label">
                            <span className="label-text font-body text-black font-semibold">Parcel weight (kg) </span>
                        </label>
                        <input readOnly
                            type="number"
                            className="w-full border-lightgray border-[1px] px-5 py-2 rounded-[20px] focus:outline-none focus:border-third font-body text-black"
                            defaultValue={parcelWeight} />
                        {errors.parcelWeight && <span className="font-body text-[14px] text-[#a12121] font-medium">This field is required</span>}
                    </div>

                    {/* Receiver's Name field */}
                    <div className="w-full lg:w-2/3 flex flex-col justify-center items-start gap-1">
                        <label className="label">
                            <span className="label-text font-body text-black font-semibold">{'Receiver\'s'} Name <span className="text-[red]">*</span></span>
                        </label>
                        <input className="w-full border-lightgray border-[1px] px-5 py-2 rounded-[20px] focus:outline-none focus:border-third font-body text-black"
                            defaultValue={recvName} {...register("recvName", { required: true })} />
                        {errors.recvName && <span className="font-body text-[14px] text-[#a12121] font-medium">This field is required</span>}
                    </div>

                    {/* Receiver's phone number field */}
                    <div className="w-full lg:w-2/3 flex flex-col justify-center items-start gap-1">
                        <label className="label">
                            <span className="label-text font-body text-black font-semibold">{'Receiver\'s'} phone <span className="text-[red]">*</span></span>
                        </label>
                        <input type="tel"
                            className="w-full border-lightgray border-[1px] px-5 py-2 rounded-[20px] focus:outline-none focus:border-third font-body text-black"
                            defaultValue={recvPhone} {...register("recvPhone", { required: true })} />
                        {errors.recvPhone && <span className="font-body text-[14px] text-[#a12121] font-medium">This field is required</span>}
                    </div>

                    {/* Delivery address field */}
                    <div className="w-full lg:w-2/3 flex flex-col justify-center items-start gap-1">
                        <label className="label">
                            <span className="label-text font-body text-black font-semibold">Parcel delivery address <span className="text-[red]">*</span></span>
                        </label>
                        <textarea className="w-full border-lightgray border-[1px] px-5 py-2 rounded-[20px] focus:outline-none focus:border-third font-body text-black"
                            defaultValue={delvAddress} {...register("delvAddress", { required: true })} />
                        {errors.delvAddress && <span className="font-body text-[14px] text-[#a12121] font-medium">This field is required</span>}
                    </div>

                    {/* Delivery date field */}
                    <div className="w-full lg:w-2/3 flex flex-col justify-center items-start gap-1">
                        <label className="label">
                            <span className="label-text font-body text-black font-semibold">Requested delivery date <span className="text-[red]">*</span></span>
                        </label>
                        <input type="date" min={todayDate} {...register("delvDate", { required: true })}
                            className="w-full border-lightgray border-[1px] px-5 py-2 rounded-[20px] focus:outline-none focus:border-third font-body text-black"
                            defaultValue={delvDate} />

                        {errors.delvDate && <span className="font-body text-[14px] text-[#a12121] font-medium">This field is required</span>}
                    </div>

                    {/* Delivery latitude and longitude*/}
                    <div className="w-full lg:w-2/3 flex flex-col justify-center items-start gap-1">

                        <div className="w-full flex justify-between items-center gap-8">

                            {/* latitude */}
                            <div className="w-[50%] flex flex-col justify-center items-start">
                                <label className="label">
                                    <span className="label-text font-body text-black font-semibold">Delivery address latitude <span className="text-[red]">*</span></span>
                                </label>
                                <input className="w-full border-lightgray border-[1px] px-5 py-2 rounded-[20px] focus:outline-none focus:border-third font-body text-black"
                                    defaultValue={latitude} {...register("latitude", { required: true })} />
                                {errors.latitude && <span className="font-body text-[14px] text-[#a12121] font-medium">This field is required</span>}
                            </div>

                            {/* longitude */}
                            <div className="w-[50%] flex flex-col justify-center items-start">
                                <label className="label">
                                    <span className="label-text font-body text-black font-semibold">Delivery address longitude <span className="text-[red]">*</span></span>
                                </label>
                                <input className="w-full border-lightgray border-[1px] px-5 py-2 rounded-[20px] focus:outline-none focus:border-third font-body text-black"
                                    defaultValue={longitude} {...register("longitude", { required: true })} />
                                {errors.longitude && <span className="font-body text-[14px] text-[#a12121] font-medium">This field is required</span>}
                            </div>

                        </div>
                    </div>

                    {/* Parcel pricing field */}
                    <div className="w-full lg:w-2/3 flex flex-col justify-center items-start gap-1">
                        <label className="label">
                            <span className="label-text font-body text-black font-semibold">Total cost</span>
                        </label>
                        <input type="text" defaultValue={`$${cost}`} readOnly
                            className="w-full border-lightgray border-[1px] px-5 py-2 rounded-[20px] focus:outline-none focus:border-third font-body text-black" />
                    </div>

                    <input type="submit" value="Update Booking" className="w-full lg:w-2/3 text-white bg-third px-5 py-3 rounded-[50px] hover:bg-main duration-500 font-heading font-semibold cursor-pointer" />
                </form>

            </div>
        </div>
    );
};

export default UpdaateBooking;