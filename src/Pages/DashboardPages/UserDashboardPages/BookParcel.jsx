import { useForm } from "react-hook-form"
import useAuthProvider from "../../../Hooks/useAuthProvider/useAuthProvider";
import { useMemo, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


const BookParcel = () => {


    // hooks and custom hooks
    const { currentUser } = useAuthProvider();
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [price, setPrice] = useState(0);

    console.log(price);

    // Get the weight and call the pricing function
    const handleWeightChange = weight => {
        handlePrice(weight);
    };


    // handle pricing according to weight
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



    // price calculation for the parcel weight
    // const priceCalculation = () => {
    //     if (weight > 0 && weight <= 1) {
    //        return 50;
    //     } else if (weight > 1 && weight <= 2) {
    //        return 100;
    //     } else {
    //         return 150;
    //     }
    // };

    // console.log(priceCalculation);



    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm()

    const onSubmit = (data) => console.log(data)

    console.log(watch("example")) // watch input value by passing the name of it





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
                            <span className="label-text font-body text-black font-semibold">Details about your parcel <span className="text-[red]">*</span></span>
                        </label>
                        <textarea className="w-full border-lightgray border-[1px] px-5 py-2 rounded-[20px] focus:outline-none focus:border-third font-body text-black"
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
                            console.log(weight)
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
                            placeholder="Receiver's name" {...register("recName", { required: true })} />
                        {errors.recName && <span className="font-body text-[14px] text-[#a12121] font-medium">This field is required</span>}
                    </div>

                    {/* Receiver's phone number field */}
                    <div className="w-full lg:w-2/3 flex flex-col justify-center items-start gap-1">
                        <label className="label">
                            <span className="label-text font-body text-black font-semibold">{'Receiver\'s'} phone <span className="text-[red]">*</span></span>
                        </label>
                        <input type="tel"
                            className="w-full border-lightgray border-[1px] px-5 py-2 rounded-[20px] focus:outline-none focus:border-third font-body text-black"
                            placeholder="Receiver's phone number" {...register("recPhone", { required: true })} />
                        {errors.recPhone && <span className="font-body text-[14px] text-[#a12121] font-medium">This field is required</span>}
                    </div>

                    {/* Delivery address field */}
                    <div className="w-full lg:w-2/3 flex flex-col justify-center items-start gap-1">
                        <label className="label">
                            <span className="label-text font-body text-black font-semibold">Parcel delivery address <span className="text-[red]">*</span></span>
                        </label>
                        <textarea className="w-full border-lightgray border-[1px] px-5 py-2 rounded-[20px] focus:outline-none focus:border-third font-body text-black"
                            placeholder="Delivery address" {...register("delAddress", { required: true })} />
                        {errors.delAddress && <span className="font-body text-[14px] text-[#a12121] font-medium">This field is required</span>}
                    </div>

                    {/* Delivery date field */}
                    <div className="w-full lg:w-2/3 flex flex-col justify-center items-start gap-1">
                        <label className="label">
                            <span className="label-text font-body text-black font-semibold">Requested delivery date <span className="text-[red]">*</span></span>
                        </label>
                        <DatePicker {...register("reqDate", { required: true })}
                            showIcon
                            minDate={selectedDate}
                            selected={selectedDate}
                            onChange={(date) => setSelectedDate(date)}
                            dateFormat="MMMM d, yyyy" className="w-full border-lightgray border-[1px] px-5 py-2 rounded-[20px] focus:outline-none focus:border-third font-body text-black" />
                        {errors.reqDate && <span className="font-body text-[14px] text-[#a12121] font-medium">This field is required</span>}
                    </div>

                    {/* Delivery address latitude and longitude*/}
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
                        <input type="text"
                            className="w-full border-lightgray border-[1px] px-5 py-2 rounded-[20px] focus:outline-none focus:border-third font-body text-black"
                            value={`$${price}`} {...register("price")} />
                    </div>

                    <input type="submit" value="Ship it now" className="w-full lg:w-2/3 text-white bg-third px-5 py-3 rounded-[50px] hover:bg-main duration-500 font-heading font-semibold cursor-pointer" />
                </form>



            </div>
        </div>
    );
};

export default BookParcel;