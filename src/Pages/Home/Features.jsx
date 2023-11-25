import SectionTitle from "../../Components/Shared/SectionTitle/SectionTitle";
import { FaMagnifyingGlassLocation } from "react-icons/fa6";
import { TbClockCheck } from "react-icons/tb";
import { IoLockClosed } from "react-icons/io5";
import { useRef } from "react";
import { useInView } from "framer-motion";




const Features = () => {


    const animate = useRef(null);
    const isInView = useInView(animate);




    return (
        <div className="container mx-auto p-5 flex flex-col justify-center gap-10 items-center mt-[100px] overflow-hidden">
            <SectionTitle
                firstPart="Our Features"
                secondPart="Your Advantage"
            ></SectionTitle>

            <div className="flex justify-center items-stretch w-[90%] mt-5">

                <div className="bg-third p-10 flex flex-col gap-5 justify-center items-center rounded-l-xl w-[33%]"
                    ref={animate}
                    style={{
                        transform: isInView ? "none" : "translateY(70px)",
                        opacity: isInView ? "1" : "0",
                        transition: "all 1s"
                    }}>
                    <FaMagnifyingGlassLocation className="text-[120px] text-lightgray" />
                    <h3 className="text-lightgray text-3xl font-body font-semibold text-center">Real-Time Tracking</h3>
                    <p className="text-center text-lightgray font-body">Stay in control with real-time tracking—live updates on your {'package\'s'} location and delivery time. Trust a seamless experience for transparent, worry-free deliveries.</p>
                </div>

                <div className="bg-main p-10 flex flex-col gap-5 justify-center items-center w-[33%]"
                    ref={animate}
                    style={{
                        transform: isInView ? "none" : "translateY(70px)",
                        opacity: isInView ? "1" : "0",
                        transition: "all 2s"
                    }}>
                    <TbClockCheck className="text-[120px] text-white" />
                    <h3 className="text-white text-3xl font-body font-semibold text-center">Flexible Delivery Solutions</h3>
                    <p className="text-center text-white font-body">Take control of your deliveries with flexible scheduling, diverse time slots, and hassle-free rescheduling. We adapt to your dynamic lifestyle for a personalized, stress-free experience.</p>
                </div>

                <div className="bg-third p-10 flex flex-col gap-5 justify-center items-center self-stretch rounded-r-xl w-[33%]"
                    ref={animate}
                    style={{
                        transform: isInView ? "none" : "translateY(70px)",
                        opacity: isInView ? "1" : "0",
                        transition: "all 3s"
                    }}>
                    <IoLockClosed className="text-[120px] text-lightgray" />
                    <h3 className="text-lightgray text-3xl font-body font-semibold text-center">Secure Deliveries</h3>
                    <p className="text-center text-lightgray font-body">We assure timely, secure deliveries—consistently meeting and exceeding your expectations for a dependable and satisfying experience.</p>
                </div>
            </div>



        </div>
    );
};

export default Features;