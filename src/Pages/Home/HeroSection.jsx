import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import useAxiosOpen from "../../Hooks/useAxiosOpen/useAxiosOpen";


const HeroSection = () => {

    // Framer motionw
    const animate = useRef(null);
    const isInView = useInView(animate);

    // hooks and custom hooks
    const axiosOpen = useAxiosOpen();
    const [trackingStatus, setTrackingStatus] = useState('');
    const [validIdMessage, setValidIdMessage] = useState('');
    const trackingForm = useRef(null);


    // tracking the parcel
    const handleParcelTrack = e => {
        e.preventDefault();

        const trackingId = e.target.trackingId.value;
        const isValidObjectId = /^[0-9a-fA-F]{24}$/.test(trackingId);

        setValidIdMessage('')

        if (!isValidObjectId) {
            return setValidIdMessage("Please provide a valid ID")
        }

        axiosOpen.get(`/homeparceltracking?id=${trackingId}`)
            .then(res => {
                setTrackingStatus(res.data.trackingResult.bookingStatus);
                trackingForm.current.reset();
            })
            .catch(err => {
                if (err) {
                    setTrackingStatus(err?.response?.data?.error)
                }
            })
    }

    // open modal to show tracking result
    const openReviewModal = () => {
        const modal = document.getElementById('trackingModal');
        modal.showModal();
    }



    const heroImg = 'https://i.ibb.co/PDsgvKc/Untitled-design-1.png';


    return (
        <div className="flex justify-end items-center container mx-auto w-full relative">

            {/* hero section left side details */}
            <div className="bg-[#16CCF5E0] w-[95%] lg:w-[50%] p-10 flex flex-col justify-center items-start gap-4 absolute top-[200px] lg:top-[50px] left-[20px] rounded-2xl z-10"
                ref={animate}
                style={{
                    transform: isInView ? "none" : "translateX(-100px)",
                    opacity: isInView ? "1" : "0",
                    transition: "all 1.8s"
                }}
            >

                {/* heading */}
                <h2 className="uppercase text-left font-heading font-bold text-4xl lg:text-5xl text-white">Glide with Pride</h2>
                <h2 className="uppercase text-left font-heading font-bold text-4xl lg:text-5xl text-third">Glide with Parcel</h2>

                {/* divider */}
                <div className="flex justify-center items-center w-full gap-[2%]">
                    <div className="bg-lightgray w-[15%] lg:w-[49%] h-[2px]"></div>
                    <p className="w-[85%] lg:w-[49%] font-body text-white font-medium">In the Spirit of Timeless Delivery</p>
                </div>

                {/* tracking parcel */}
                <p className="font-body font-semibold text-base text-white">Track Your Parcel!</p>

                <div className="relative flex flex-col justify-center items-center w-full lg:w-[70%]">
                    {/* parcel tracking form */}
                    <form onSubmit={handleParcelTrack}
                        ref={trackingForm}
                        className="w-full">
                        <div className="w-full flex flex-col justify-start items-start gap-2">
                            <input required type="text" name="trackingId" placeholder="Your tracking ID" id="trackingId" className="w-full focus:outline-none px-[20px] py-3 rounded-[40px]" />
                            {
                                validIdMessage ? <p className="text-[#852121] text-[14px] font-semibold font-body w-[80%]">{validIdMessage}</p> : ''
                            }
                        </div>
                        <input type="submit"
                        value="Track Parcel"
                        onClick={openReviewModal}
                        className="absolute top-1 right-1 bg-third font-heading text-white px-4 py-2 rounded-[20px] hover:bg-sub duration-500" />
                        {/* <button className="absolute top-1 right-1 bg-third font-heading text-white px-4 py-2 rounded-[20px] hover:bg-sub duration-500">Track Parcel</button> */}
                    </form>
                </div>
            </div>

            {/* hero section image */}
            <img src={heroImg} alt="" className="w-[100%] lg:w-[60%] z-0"
                ref={animate}
                style={{
                    transform: isInView ? "none" : "translateY(-100px)",
                    opacity: isInView ? "1" : "0",
                    transition: "all 1.8s"
                }} />



            {/* modal to show for tracking result */}
            <dialog id="trackingModal" className="modal modal-bottom sm:modal-middle w-full">
                <div className="modal-box flex flex-col justify-center items-center gap-3 w-full p-5">

                    <h2 className="text-third text-3xl font-heading font-bold">Parcel status</h2>

                    {
                        trackingStatus === "Invalid tracking ID" ?
                            <h3 className="mt-4 font-body text-xl font-bold text-darkgray text-center">{trackingStatus}</h3>
                            :
                            <h3 className="mt-4 font-body text-xl font-bold text-darkgray text-center">Your parcel status is: {trackingStatus}</h3>
                    }

                    <div className="modal-action">
                        <form method="dialog">
                            {/* if there is a button in form, it will close the modal */}
                            <button className="font-body text-[16px] bg-third text-white px-4 py-3 rounded">Close</button>
                        </form>
                    </div>
                </div>
            </dialog>
        </div>
    );
};

export default HeroSection;