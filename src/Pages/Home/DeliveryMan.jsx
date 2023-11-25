import SectionTitle from "../../Components/Shared/SectionTitle/SectionTitle";


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

            <div className="grid md:grid-cols-7 lg:grid-cols-8 md:grid-rows-3 lg:grid-rows-2 gap-8 mt-10 md:px-5">

                {/* 1st delivery man */}
                <div className="flex flex-col justify-center items-center gap-3 relative md:col-start-1 lg:col-start-2 lg:col-span-2 md:col-span-3">
                    {/* delivery man image */}
                    <img src={dbMan1} alt="" className="w-[250px] h-[250px] bg-cover rounded-[50%]" />
                    {/* delivery man details */}
                    <div className="z-10 flex flex-col justify-center items-center gap-2 w-full">
                        <h3 className="text-2xl font-body font-semibold text-sub">Ethan Chase</h3>
                        <div className="w-full flex justify-between items-center">
                            <p className="font-semibold font-body text-darkgray">Parcel delivered:</p>
                            <p className="font-semibold font-body text-darkgray">56</p>
                        </div>
                        <div className="w-full flex justify-between items-center">
                            <p className="font-semibold font-body text-darkgray">Average rating:</p>
                            <p className="font-semibold font-body text-darkgray">4.39</p>
                        </div>
                    </div>
                    <h3 className="text-9xl font-bold font-heading text-lightgray absolute left-[-70px] top-0 z-0">01</h3>
                </div>

                {/* 2nd delivery man */}
                <div className="flex flex-col justify-center items-center gap-3 relative md:col-start-5 lg:col-start-6 md:col-span-3 lg:col-span-2">
                    {/* delivery man image */}
                    <img src={dbMan2} alt="" className="w-[250px] h-[250px] bg-cover rounded-[50%]" />
                    {/* delivery man details */}
                    <div className="z-10 flex flex-col justify-center items-center gap-2 w-full">
                        <h3 className="text-2xl font-body font-semibold text-sub">Caleb James</h3>
                        <div className="w-full flex justify-between items-center">
                            <p className="font-semibold font-body text-darkgray">Parcel delivered:</p>
                            <p className="font-semibold font-body text-darkgray">50</p>
                        </div>
                        <div className="w-full flex justify-between items-center">
                            <p className="font-semibold font-body text-darkgray">Average rating:</p>
                            <p className="font-semibold font-body text-darkgray">4.79</p>
                        </div>
                    </div>
                    <h3 className="text-9xl font-bold font-heading text-lightgray absolute left-[-70px] top-0 z-0">02</h3>
                </div>

                {/* 3rd delivery man */}
                <div className="flex flex-col justify-center items-center gap-3 relative md:col-start-3 lg:col-start-1 md:col-span-3 lg:col-span-2">
                    {/* delivery man image */}
                    <img src={dbMan3} alt="" className="w-[250px] h-[250px] bg-cover rounded-[50%]" />
                    {/* delivery man details */}
                    <div className="z-10 flex flex-col justify-center items-center gap-2 w-full">
                        <h3 className="text-2xl font-body font-semibold text-sub">Logan Cole</h3>
                        <div className="w-full flex justify-between items-center">
                            <p className="font-semibold font-body text-darkgray">Parcel delivered:</p>
                            <p className="font-semibold font-body text-darkgray">45</p>
                        </div>
                        <div className="w-full flex justify-between items-center">
                            <p className="font-semibold font-body text-darkgray">Average rating:</p>
                            <p className="font-semibold font-body text-darkgray">4.78</p>
                        </div>
                    </div>
                    <h3 className="text-9xl font-bold font-heading text-lightgray absolute left-[-70px] top-0 z-0">03</h3>
                </div>
                
                {/* 4th delivery man */}
                <div className="flex flex-col justify-center items-center gap-3 relative col-start-4 col-span-2">
                    {/* delivery man image */}
                    <img src={dbMan4} alt="" className="w-[250px] h-[250px] bg-cover rounded-[50%]" />
                    {/* delivery man details */}
                    <div className="z-10 flex flex-col justify-center items-center gap-2 w-full">
                        <h3 className="text-2xl font-body font-semibold text-sub">Mason Scott</h3>
                        <div className="w-full flex justify-between items-center">
                            <p className="font-semibold font-body text-darkgray">Parcel delivered:</p>
                            <p className="font-semibold font-body text-darkgray">39</p>
                        </div>
                        <div className="w-full flex justify-between items-center">
                            <p className="font-semibold font-body text-darkgray">Average rating:</p>
                            <p className="font-semibold font-body text-darkgray">4.58</p>
                        </div>
                    </div>
                    <h3 className="text-9xl font-bold font-heading text-lightgray absolute left-[-70px] top-0 z-0">04</h3>
                </div>
                
                {/* 5th delivery man */}
                <div className="flex flex-col justify-center items-center gap-3 relative col-start-7 col-span-2">
                    {/* delivery man image */}
                    <img src={dbMan5} alt="" className="w-[250px] h-[250px] bg-cover rounded-[50%]" />
                    {/* delivery man details */}
                    <div className="z-10 flex flex-col justify-center items-center gap-2 w-full">
                        <h3 className="text-2xl font-body font-semibold text-sub">Liam Grant</h3>
                        <div className="w-full flex justify-between items-center">
                            <p className="font-semibold font-body text-darkgray">Parcel delivered:</p>
                            <p className="font-semibold font-body text-darkgray">31</p>
                        </div>
                        <div className="w-full flex justify-between items-center">
                            <p className="font-semibold font-body text-darkgray">Average rating:</p>
                            <p className="font-semibold font-body text-darkgray">4.87</p>
                        </div>
                    </div>
                    <h3 className="text-9xl font-bold font-heading text-lightgray absolute left-[-70px] top-0 z-0">05</h3>
                </div>



            </div>
            
        </div>
    );
};

export default DeliveryMan;