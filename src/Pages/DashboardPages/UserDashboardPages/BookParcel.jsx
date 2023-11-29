import { useForm } from "react-hook-form"
import useAuthProvider from "../../../Hooks/useAuthProvider/useAuthProvider";
import { useState } from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure/useAxiosSecure";
import Swal from 'sweetalert2';


const BookParcel = () => {


    // hooks and custom hooks
    const { currentUser } = useAuthProvider();
    const [price, setPrice] = useState(0);
    const axiosSecure = useAxiosSecure();
    // react hook form
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm()


    // get today's date and validate for min date in the form's date picker
    const todayDate = new Date().toISOString().split('T')[0];


    // Get the weight from input field and call the pricing function
    const handleWeightChange = weight => {
        handlePrice(weight);
    };


    // set the pricing according to weight
    const handlePrice = weight => {
        if (!weight) {
            setPrice(0)
        }
        else if (weight > 0 && weight <= 1) {
            setPrice(50)
        } else if (weight > 1 && weight <= 2) {
            setPrice(100)
        } else {
            setPrice(150)
        }
    }

    // handle form submission
    const onSubmit = data => {
        data.price = price;
        const name = data.name;
        const email = data.email;
        const phone = data.phone;
        const parcelType = data.parcelType;
        const parcelWeight = parseInt(data.parcelWeight);
        const recvName = data.recvName;
        const recvPhone = data.recvPhone;
        const delvAddress = data.delvAddress;
        const delvDate = data.delvDate;
        const latitude = data.latitude;
        const longitude = data.longitude;
        const cost = data.price;
        const bookingDate = todayDate;

        const newBookingInfo = { name, email, phone, parcelType, parcelWeight, recvName, recvPhone, delvAddress, delvDate, latitude, longitude, cost, bookingDate };


        // send the new booking data to database
        axiosSecure.post("/booking", newBookingInfo)
            .then(res => {
                if (res.data.insertedId) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "You have a successful booking",
                        showConfirmButton: false,
                        timer: 1500,
                    });
                    reset();
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
            <h2 className="text-5xl font-heading text-third font-bold">Book your <span className="text-main">Parcel</span></h2>

            {/* Book parcel form */}
            <div className="w-full mt-5">

                <form onSubmit={handleSubmit(onSubmit)}
                    className="w-full flex flex-col justify-center items-center gap-8">

                    {/* Name field */}
                    <div className="w-full lg:w-2/3 flex flex-col justify-center items-start gap-1">
                        <label className="label">
                            <span className="label-text font-body text-black font-semibold">Your Name <span className="text-[red]">*</span></span>
                        </label>
                        <input className="w-full border-lightgray border-[1px] px-5 py-2 rounded-[20px] focus:outline-none focus:border-third font-body text-black"
                            defaultValue={currentUser?.displayName} {...register("name", { required: true })} />
                        {errors.name && <span className="font-body text-[14px] text-[#a12121] font-medium">This field is required</span>}
                    </div>

                    {/* email field */}
                    <div className="w-full lg:w-2/3 flex flex-col justify-center items-start gap-1">
                        <label className="label">
                            <span className="label-text font-body text-black font-semibold">Your email <span className="text-[red]">*</span></span>
                        </label>
                        <input className="w-full border-lightgray border-[1px] px-5 py-2 rounded-[20px] focus:outline-none focus:border-third font-body text-black"
                            defaultValue={currentUser?.email} {...register("email", { required: true })} />
                        {errors.email && <span className="font-body text-[14px] text-[#a12121] font-medium">This field is required</span>}
                    </div>

                    {/* phone number field */}
                    <div className="w-full lg:w-2/3 flex flex-col justify-center items-start gap-1">
                        <label className="label">
                            <span className="label-text font-body text-black font-semibold">Your phone <span className="text-[red]">*</span></span>
                        </label>
                        <input type="tel"
                            className="w-full border-lightgray border-[1px] px-5 py-2 rounded-[20px] focus:outline-none focus:border-third font-body text-black"
                            placeholder="Your phone number" {...register("phone", { required: true })} />
                        {errors.phone && <span className="font-body text-[14px] text-[#a12121] font-medium">This field is required</span>}
                    </div>

                    {/* Parcel type field */}
                    <div className="w-full lg:w-2/3 flex flex-col justify-center items-start gap-1">
                        <label className="label">
                            <span className="label-text font-body text-black font-semibold">Your parcel type <span className="text-[red]">*</span></span>
                        </label>
                        <input type="text" className="w-full border-lightgray border-[1px] px-5 py-2 rounded-[20px] focus:outline-none focus:border-third font-body text-black"
                            placeholder="Your parcel type" {...register("parcelType", { required: true })} />
                        {errors.parcelType && <span className="font-body text-[14px] text-[#a12121] font-medium">This field is required</span>}
                    </div>

                    {/* Parcel weight field */}
                    <div className="w-full lg:w-2/3 flex flex-col justify-center items-start gap-1">
                        <label className="label">
                            <span className="label-text font-body text-black font-semibold">Parcel weight (kg) <span className="text-[red]">*</span></span>
                        </label>
                        <input type="number" min="1" onInput={(event) => {
                            let weight = parseInt(event.target.value);
                            handleWeightChange(weight);
                            // setWeight(parseInt(event.target.value));
                        }}
                            className="w-full border-lightgray border-[1px] px-5 py-2 rounded-[20px] focus:outline-none focus:border-third font-body text-black"
                            placeholder="Parcel weight" {...register("parcelWeight", { required: true })} />
                        {errors.parcelWeight && <span className="font-body text-[14px] text-[#a12121] font-medium">This field is required</span>}
                    </div>

                    {/* Receiver's Name field */}
                    <div className="w-full lg:w-2/3 flex flex-col justify-center items-start gap-1">
                        <label className="label">
                            <span className="label-text font-body text-black font-semibold">{'Receiver\'s'} Name <span className="text-[red]">*</span></span>
                        </label>
                        <input className="w-full border-lightgray border-[1px] px-5 py-2 rounded-[20px] focus:outline-none focus:border-third font-body text-black"
                            placeholder="Receiver's name" {...register("recvName", { required: true })} />
                        {errors.recvName && <span className="font-body text-[14px] text-[#a12121] font-medium">This field is required</span>}
                    </div>

                    {/* Receiver's phone number field */}
                    <div className="w-full lg:w-2/3 flex flex-col justify-center items-start gap-1">
                        <label className="label">
                            <span className="label-text font-body text-black font-semibold">{'Receiver\'s'} phone <span className="text-[red]">*</span></span>
                        </label>
                        <input type="tel"
                            className="w-full border-lightgray border-[1px] px-5 py-2 rounded-[20px] focus:outline-none focus:border-third font-body text-black"
                            placeholder="Receiver's phone number" {...register("recvPhone", { required: true })} />
                        {errors.recvPhone && <span className="font-body text-[14px] text-[#a12121] font-medium">This field is required</span>}
                    </div>

                    {/* Delivery address field */}
                    <div className="w-full lg:w-2/3 flex flex-col justify-center items-start gap-1">
                        <label className="label">
                            <span className="label-text font-body text-black font-semibold">Parcel delivery address <span className="text-[red]">*</span></span>
                        </label>
                        <textarea className="w-full border-lightgray border-[1px] px-5 py-2 rounded-[20px] focus:outline-none focus:border-third font-body text-black"
                            placeholder="Delivery address" {...register("delvAddress", { required: true })} />
                        {errors.delvAddress && <span className="font-body text-[14px] text-[#a12121] font-medium">This field is required</span>}
                    </div>

                    {/* Delivery date field */}
                    <div className="w-full lg:w-2/3 flex flex-col justify-center items-start gap-1">
                        <label className="label">
                            <span className="label-text font-body text-black font-semibold">Requested delivery date <span className="text-[red]">*</span></span>
                        </label>
                        <input type="date" min={todayDate} {...register("delvDate", { required: true })}
                            className="w-full border-lightgray border-[1px] px-5 py-2 rounded-[20px] focus:outline-none focus:border-third font-body text-black"
                            placeholder="Receiver's phone number" />

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
                                    placeholder="Latitude" {...register("latitude", { required: true })} />
                                {errors.latitude && <span className="font-body text-[14px] text-[#a12121] font-medium">This field is required</span>}
                            </div>

                            {/* longitude */}
                            <div className="w-[50%] flex flex-col justify-center items-start">
                                <label className="label">
                                    <span className="label-text font-body text-black font-semibold">Delivery address longitude <span className="text-[red]">*</span></span>
                                </label>
                                <input className="w-full border-lightgray border-[1px] px-5 py-2 rounded-[20px] focus:outline-none focus:border-third font-body text-black"
                                    placeholder="Longitude" {...register("longitude", { required: true })} />
                                {errors.longitude && <span className="font-body text-[14px] text-[#a12121] font-medium">This field is required</span>}
                            </div>

                        </div>
                    </div>

                    {/* Parcel pricing field */}
                    <div className="w-full lg:w-2/3 flex flex-col justify-center items-start gap-1">
                        <label className="label">
                            <span className="label-text font-body text-black font-semibold">Total cost <span className="text-[red]">*</span></span>
                        </label>
                        <input type="text" value={`$${price}`} {...register("price", { defaultValue: `$${price}` })} readOnly
                            className="w-full border-lightgray border-[1px] px-5 py-2 rounded-[20px] focus:outline-none focus:border-third font-body text-black" />
                    </div>

                    <input type="submit" value="Ship the parcel" className="w-full lg:w-2/3 text-white bg-third px-5 py-3 rounded-[50px] hover:bg-main duration-500 font-heading font-semibold cursor-pointer" />
                </form>

            </div>
        </div>
    );
};

export default BookParcel;