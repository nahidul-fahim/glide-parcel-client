import { useInView } from "framer-motion";
import { useRef } from "react";


const HeroSection = () => {


    // Framer motionw
    const animate = useRef(null);
    const isInView = useInView(animate);



    const heroImg = 'https://i.ibb.co/PDsgvKc/Untitled-design-1.png';


    return (
        <div className="flex justify-end items-center container mx-auto w-full relative">

            {/* hero section left side details */}
            <div className="bg-[#16CCF5E0] w-[95%] lg:w-[48%] p-10 flex flex-col justify-center items-start gap-4 absolute top-[200px] lg:top-[50px] left-[20px] rounded-2xl z-10"
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
                    <input type="text" name="trackingId" placeholder="Your tracking ID" id="trackingId" className="w-full focus:outline-none px-[20px] py-3 rounded-[40px]" />
                    <button className="absolute top-1 right-1 bg-third font-heading text-white px-4 py-2 rounded-[20px] hover:bg-sub duration-500">Track Parcel</button>
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
        </div>
    );
};

export default HeroSection;