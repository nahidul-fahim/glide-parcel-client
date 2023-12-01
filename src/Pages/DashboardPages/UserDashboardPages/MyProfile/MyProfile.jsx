import { useRef } from "react";
import useCurrentUser from "../../../../Hooks/useCurrentUser/useCurrentUser";
import { useInView } from "framer-motion";
import useParcels from "../../../../Hooks/useParcels/useParcels";



const MyProfile = () => {

    // hooks and custom hooks
    const { user } = useCurrentUser();
    const animate = useRef();
    const isInView = useInView(animate);
    // hooks and custom hooks
    const [isPending, parcels] = useParcels();


    // Loading state if no data found
    const loadingGif = "https://i.ibb.co/zmckHyD/loading-Gif.gif";
    if (isPending) {
        return <div className="h-[100vh] flex justify-center items-center"><img src={loadingGif} alt="" /></div>
    }


    // get the total cost for the price
    const totalCost = parcels.reduce((total, parcel) => total + parcel.cost, 0);








    // images
    const planeBg = "https://i.ibb.co/dQvP6K8/sectionbg.png";

    return (
        <div className="flex flex-col justify-center items-center gap-10 w-full py-[50px] px-5">

            {/* user intro section */}
            <div className="bg-white shadow-[0_0_70px_#00000028] p-10 flex flex-col justify-center items-center gap-5 w-full relative">
                <img src={user.photo} alt={`${user?.name} image`} className="rounded-full z-10"
                    ref={animate}
                    style={{
                        scale: isInView ? "1" : "0.4",
                        opacity: isInView ? "1" : "0",
                        transition: "all .5s"
                    }}
                />
                <h2 className="mt-4 text-4xl font-body font-bold text-main z-10  text-center">Hi, <span className="text-third">{user?.name}</span></h2>
                <p className="text-darkgray font-body font-medium z-10">ID: {user._id}</p>
                <img src={planeBg} alt=""
                    className="absolute opacity-70 right-10 z-[1]"
                    ref={animate}
                    style={{
                        transform: isInView ? "none" : "translateX(-400px)",
                        transition: "all 3s"
                    }}
                />
            </div>

            {/* user stats section */}
            <div className="bg-white w-full flex flex-col md:flex-row justify-around items-center gap-10">

                <div className="shadow-[0_0_70px_#00000028] p-10 w-[90%] md:w-[50%]"
                    ref={animate}
                    style={{
                        transform: isInView ? "none" : "translateX(-50px)",
                        opacity: isInView ? "1" : "0",
                        transition: "all 1s"
                    }}
                >
                    <h2 className="text-3xl font-semibold font-body text-darkgray text-center leading-[50px]">Total bookings: <br /> <span>{parcels.length}</span></h2>
                </div>

                <div className="shadow-[0_0_70px_#00000028] p-10 w-[90%] md:w-[50%]"
                    ref={animate}
                    style={{
                        transform: isInView ? "none" : "translateX(50px)",
                        opacity: isInView ? "1" : "0",
                        transition: "all 1s"
                    }}
                >
                    <h2 className="text-3xl font-semibold font-body text-darkgray text-center leading-[50px]">Total cost: <br /> <span>${totalCost}</span></h2>
                </div>

            </div>
        </div>
    );
};

export default MyProfile;