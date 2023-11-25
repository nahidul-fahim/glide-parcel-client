import SectionTitle from "../../Components/Shared/SectionTitle/SectionTitle";
import { FaMagnifyingGlassLocation } from "react-icons/fa6";
import { TbClockCheck } from "react-icons/tb";
import { IoLockClosed } from "react-icons/io5";
import { useRef } from "react";
import { useInView } from "framer-motion";


const Features = () => {

    // Framer motion hooks
    const animate1 = useRef(null);
    const isInView1 = useInView(animate1);
    const animate2 = useRef(null);
    const isInView2 = useInView(animate2);
    const animate3 = useRef(null);
    const isInView3 = useInView(animate3);


    return (
        <div className="container mx-auto p-5 flex flex-col justify-center gap-10 items-center mt-[370px] md:mt-[100px] overflow-hidden">
            <SectionTitle
                firstPart="Our Features"
                secondPart="Your Advantage"
            ></SectionTitle>

            <div className="flex flex-col md:flex-row justify-center items-stretch w-full lg:w-[90%] mt-5">

                {/* 1st card */}
                <div className="bg-third p-10 flex flex-col gap-5 justify-center items-center rounded-t-xl md:rounded-r-none md:rounded-l-xl w-full md:w-[33%]"
                    ref={animate1}
                    style={{
                        transform: isInView1 ? "none" : "translateX(-70px)",
                        opacity: isInView1 ? "1" : "0",
                        transition: "all 1s",
                    }}>
                    <FaMagnifyingGlassLocation className="text-[120px] text-lightgray" />
                    <h3 className="text-lightgray text-2xl font-body font-semibold text-center">Real-Time Tracking</h3>
                    <p className="text-center text-lightgray font-body">Stay in control with real-time tracking—live updates on your {'package\'s'} location and delivery time. Trust a seamless experience for transparent, worry-free deliveries.</p>
                </div>

                {/* 2nd card */}
                <div className="bg-main p-10 flex flex-col gap-5 justify-center items-center w-full md:w-[33%]"
                    ref={animate2}
                    style={{
                        // transform: isInView2 ? "none" : "translateX(70px)",
                        opacity: isInView2 ? "1" : "0",
                        transition: "all .7s",
                    }}>
                    <TbClockCheck className="text-[120px] text-white" />
                    <h3 className="text-white text-2xl font-body font-semibold text-center">Flexible Delivery Solutions</h3>
                    <p className="text-center text-white font-body">Take control of your deliveries with flexible scheduling, diverse time slots, and hassle-free rescheduling. We adapt to your dynamic lifestyle for a personalized, stress-free experience.</p>
                </div>

                {/* 3rd card */}
                <div className="bg-third p-10 flex flex-col gap-5 justify-center items-center self-stretch rounded-b-xl md:rounded-bl-none md:rounded-r-xl w-full md:w-[33%]"
                    ref={animate3}
                    style={{
                        transform: isInView3 ? "none" : "translateX(70px)",
                        opacity: isInView3 ? "1" : "0",
                        transition: "all 1s",
                    }}>
                    <IoLockClosed className="text-[120px] text-lightgray" />
                    <h3 className="text-lightgray text-2xl font-body font-semibold text-center">Secure Deliveries</h3>
                    <p className="text-center text-lightgray font-body">We assure timely, secure deliveries—consistently meeting and exceeding your expectations for a dependable and satisfying experience.</p>
                </div>
            </div>



        </div>
    );
};

export default Features;