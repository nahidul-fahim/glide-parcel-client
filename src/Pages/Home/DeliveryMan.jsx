import SectionTitle from "../../Components/Shared/SectionTitle/SectionTitle";
import { FaStar } from "react-icons/fa";



const DeliveryMan = () => {


    // delivery man images (temporary)
    const dbMan1 = "https://i.ibb.co/kxkx07y/profile-pic-1.png";
    const dbMan2 = "https://i.ibb.co/GM2m7cP/profile-pic-2.png";
    const dbMan3 = "https://i.ibb.co/3mQZYYw/profile-pic-3.png";
    const dbMan4 = "https://i.ibb.co/bNVgd37/profile-pic-4.png";
    const dbMan5 = "https://i.ibb.co/zs9MzYH/profile-pic.png";


    return (
        <div className="container mx-auto p-5 flex flex-col justify-center gap-x-10 gap-y-14 items-center mt-[50px] md:mt-[70px] lg:mt-[100px] overflow-hidden">
            <SectionTitle
                firstPart="Our Standout"
                secondPart="Delivery Heros"></SectionTitle>

            <div className="flex flex-wrap justify-evenly items-center gap-14 w-full">

                {/* 1st delivery man */}
                <div className="flex flex-col justify-center items-center gap-3 relative md:col-start-1 lg:col-start-2 lg:col-span-2 md:col-span-3 w-full lg:w-[33%]">
                    {/* delivery man image + statistics */}
                    <div className="relative flex flex-col justify-center items-center">
                        <img src={dbMan1} alt="" className="w-[300px] h-[300px] bg-cover rounded-[50%]" />

                        {/* parcel statistics */}
                        <div className="w-[150px] h-[150px] flex flex-col justify-center items-center bg-main px-5 py-5 rounded-[50%] absolute bottom-[-20px] left-[-50px]">
                            <p className="text-5xl font-bold font-heading text-white text-center">59</p>
                            <p className="font-body text-white text-center font-semibold">Parcels Delivered</p>
                        </div>

                        {/* rating statistics */}
                        <div className="w-[150px] h-[150px] flex flex-col justify-center items-center bg-main px-5 py-5 rounded-[50%] absolute bottom-[-20px] right-[-50px]">
                            <p className="text-5xl font-bold font-heading text-white text-center">4.90</p>
                            <p className="text-xl font-body text-white text-center font-semibold"><FaStar /></p>
                        </div>

                        {/* postition */}
                        <h3 className="text-9xl font-bold font-heading text-lightgray absolute left-[-70px] top-0 z-0">01</h3>
                    </div>

                    {/* delivery man details */}
                    <h3 className="text-3xl font-body font-semibold text-darkgray">Emil Downey</h3>
                </div>

                {/* 2nd delivery man */}
                <div className="flex flex-col justify-center items-center gap-3 relative md:col-start-1 lg:col-start-2 lg:col-span-2 md:col-span-3 w-full lg:w-[33%]">
                    {/* delivery man image + statistics */}
                    <div className="relative flex flex-col justify-center items-center">
                        <img src={dbMan2} alt="" className="w-[300px] h-[300px] bg-cover rounded-[50%]" />

                        {/* parcel statistics */}
                        <div className="w-[150px] h-[150px] flex flex-col justify-center items-center bg-main px-5 py-5 rounded-[50%] absolute bottom-[-20px] left-[-50px]">
                            <p className="text-5xl font-bold font-heading text-white text-center">52</p>
                            <p className="font-body text-white text-center font-semibold">Parcels Delivered</p>
                        </div>

                        {/* rating statistics */}
                        <div className="w-[150px] h-[150px] flex flex-col justify-center items-center bg-main px-5 py-5 rounded-[50%] absolute bottom-[-20px] right-[-50px]">
                            <p className="text-5xl font-bold font-heading text-white text-center">4.87</p>
                            <p className="text-xl font-body text-white text-center font-semibold"><FaStar /></p>
                        </div>

                        {/* postition */}
                        <h3 className="text-9xl font-bold font-heading text-lightgray absolute left-[-70px] top-0 z-0">02</h3>
                    </div>

                    {/* delivery man details */}
                    <h3 className="text-3xl font-body font-semibold text-darkgray">Mason Scott</h3>
                </div>

                {/* 3rd delivery man */}
                <div className="flex flex-col justify-center items-center gap-3 relative md:col-start-1 lg:col-start-2 lg:col-span-2 md:col-span-3 w-full lg:w-[33%]">
                    {/* delivery man image + statistics */}
                    <div className="relative flex flex-col justify-center items-center">
                        <img src={dbMan3} alt="" className="w-[300px] h-[300px] bg-cover rounded-[50%]" />

                        {/* parcel statistics */}
                        <div className="w-[150px] h-[150px] flex flex-col justify-center items-center bg-main px-5 py-5 rounded-[50%] absolute bottom-[-20px] left-[-50px]">
                            <p className="text-5xl font-bold font-heading text-white text-center">43</p>
                            <p className="font-body text-white text-center font-semibold">Parcels Delivered</p>
                        </div>

                        {/* rating statistics */}
                        <div className="w-[150px] h-[150px] flex flex-col justify-center items-center bg-main px-5 py-5 rounded-[50%] absolute bottom-[-20px] right-[-50px]">
                            <p className="text-5xl font-bold font-heading text-white text-center">4.82</p>
                            <p className="text-xl font-body text-white text-center font-semibold"><FaStar /></p>
                        </div>

                        {/* postition */}
                        <h3 className="text-9xl font-bold font-heading text-lightgray absolute left-[-70px] top-0 z-0">03</h3>
                    </div>

                    {/* delivery man details */}
                    <h3 className="text-3xl font-body font-semibold text-darkgray">Logan Cole</h3>
                </div>

                {/* 4th delivery man */}
                <div className="flex flex-col justify-center items-center gap-3 relative md:col-start-1 lg:col-start-2 lg:col-span-2 md:col-span-3 w-full lg:w-[33%]">
                    {/* delivery man image + statistics */}
                    <div className="relative flex flex-col justify-center items-center">
                        <img src={dbMan4} alt="" className="w-[300px] h-[300px] bg-cover rounded-[50%]" />

                        {/* parcel statistics */}
                        <div className="w-[150px] h-[150px] flex flex-col justify-center items-center bg-main px-5 py-5 rounded-[50%] absolute bottom-[-20px] left-[-50px]">
                            <p className="text-5xl font-bold font-heading text-white text-center">39</p>
                            <p className="font-body text-white text-center font-semibold">Parcels Delivered</p>
                        </div>

                        {/* rating statistics */}
                        <div className="w-[150px] h-[150px] flex flex-col justify-center items-center bg-main px-5 py-5 rounded-[50%] absolute bottom-[-20px] right-[-50px]">
                            <p className="text-5xl font-bold font-heading text-white text-center">4.81</p>
                            <p className="text-xl font-body text-white text-center font-semibold"><FaStar /></p>
                        </div>

                        {/* postition */}
                        <h3 className="text-9xl font-bold font-heading text-lightgray absolute left-[-70px] top-0 z-0">04</h3>
                    </div>

                    {/* delivery man details */}
                    <h3 className="text-3xl font-body font-semibold text-darkgray">Liam Grant</h3>
                </div>

                {/* 5th delivery man */}
                <div className="flex flex-col justify-center items-center gap-3 relative md:col-start-1 lg:col-start-2 lg:col-span-2 md:col-span-3 w-full lg:w-[33%]">
                    {/* delivery man image + statistics */}
                    <div className="relative flex flex-col justify-center items-center">
                        <img src={dbMan5} alt="" className="w-[300px] h-[300px] bg-cover rounded-[50%]" />

                        {/* parcel statistics */}
                        <div className="w-[150px] h-[150px] flex flex-col justify-center items-center bg-main px-5 py-5 rounded-[50%] absolute bottom-[-20px] left-[-50px]">
                            <p className="text-5xl font-bold font-heading text-white text-center">32</p>
                            <p className="font-body text-white text-center font-semibold">Parcels Delivered</p>
                        </div>

                        {/* rating statistics */}
                        <div className="w-[150px] h-[150px] flex flex-col justify-center items-center bg-main px-5 py-5 rounded-[50%] absolute bottom-[-20px] right-[-50px]">
                            <p className="text-5xl font-bold font-heading text-white text-center">4.85</p>
                            <p className="text-xl font-body text-white text-center font-semibold"><FaStar /></p>
                        </div>

                        {/* postition */}
                        <h3 className="text-9xl font-bold font-heading text-lightgray absolute left-[-70px] top-0 z-0">05</h3>
                    </div>

                    {/* delivery man details */}
                    <h3 className="text-3xl font-body font-semibold text-darkgray">Ian Barry</h3>
                </div>



            </div>

        </div>
    );
};

export default DeliveryMan;