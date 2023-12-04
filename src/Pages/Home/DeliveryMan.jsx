import { useQuery } from "@tanstack/react-query";
import SectionTitle from "../../Components/Shared/SectionTitle/SectionTitle";
import { FaStar } from "react-icons/fa";
import useAxiosOpen from "../../Hooks/useAxiosOpen/useAxiosOpen";


const DeliveryMan = () => {


    // hooks and custom hooks
    const axiosOpen = useAxiosOpen();


    // fetching data using tanstack
    const { isPending: topDeliveryManPending, data: topDeliveryMan } = useQuery({
        queryKey: ["topDeliveryMan"],
        queryFn: async () => {
            const res = await axiosOpen.get("/homepagedeliveryman")
            return res.data;
        }
    })



    return (
        <div className="container mx-auto p-5 flex flex-col justify-center gap-x-10 gap-y-14 items-center mt-[50px] md:mt-[70px] lg:mt-[100px] overflow-hidden">
            <SectionTitle
                firstPart="Our Standout"
                secondPart="Delivery Heros"></SectionTitle>

            <div className="flex flex-wrap justify-evenly items-center gap-14 w-full">

                {
                    !topDeliveryManPending ?
                        topDeliveryMan.map((man, index) =>
                            <div key={index} className="flex flex-col justify-center items-center gap-3 relative md:col-start-1 lg:col-start-2 lg:col-span-2 md:col-span-3 w-full lg:w-[33%]">
                                {/* delivery man image + statistics */}
                                <div className="relative flex flex-col justify-center items-center">
                                    <img src={man?.photo} alt="" className="w-[280px] h-[280px] bg-cover rounded-[50%]" />

                                    {/* parcel statistics */}
                                    <div className="w-[120px] h-[120px] flex flex-col justify-center items-center bg-main px-5 py-5 rounded-[50%] absolute bottom-[-20px] left-[-50px]">
                                        <p className="text-4xl font-bold font-heading text-white text-center">{man?.totalDelivery}</p>
                                        <p className="font-body text-white text-center font-semibold text-[14px]">Parcels Delivered</p>
                                    </div>

                                    {/* rating statistics */}
                                    <div className="w-[120px] h-[120px] flex flex-col justify-center items-center bg-main px-5 py-5 rounded-[50%] absolute bottom-[-20px] right-[-50px]">
                                        <p className="text-4xl font-bold font-heading text-white text-center">{man?.avgReview}</p>
                                        <p className="text-xl font-body text-white text-center font-semibold"><FaStar /></p>
                                    </div>
                                    
                                </div>

                                {/* delivery man details */}
                                <h3 className="text-2xl font-body font-semibold text-darkgray">{man?.name}</h3>
                            </div>)
                        :
                        <span className="loading loading-dots loading-lg text-white"></span>
                }

            </div>

        </div>
    );
};

export default DeliveryMan;