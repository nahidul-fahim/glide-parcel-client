import { useRef } from "react";
import useCurrentUser from "../../../../Hooks/useCurrentUser/useCurrentUser";
import { useInView } from "framer-motion";
import useParcels from "../../../../Hooks/useParcels/useParcels";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure/useAxiosSecure";
import axios from "axios";


// image hosting api and url
const imageHostngApiKey = import.meta.env.VITE_IMAGE_HOSTING_SECRETKEY;
const imageUploadUrl = `https://api.imgbb.com/1/upload?key=${imageHostngApiKey}`;

const MyProfile = () => {

    // hooks and custom hooks
    const { user, refetch } = useCurrentUser();
    const animate = useRef();
    const isInView = useInView(animate);
    const [isPending, parcels] = useParcels();
    const axiosSecure = useAxiosSecure();

    console.log(user);


    // handlge file change when image selected
    const handleFileChange = e => {
        const fileInput = e.target;
        if (fileInput.files.length > 0) {

            const newImg = e.target.files[0];


            // host the photo to imgbb hosting
            const formData = new FormData();
            formData.append('image', newImg);

            axios.post(imageUploadUrl, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                params: {
                    key: imageHostngApiKey,
                },
            })
                .then(res => {
                    if (res.data.success) {
                        const photo = res.data.data.display_url;
                        const updatedImg = { photo };
                        // send the updated profile image to databse
                        axiosSecure.put(`/profilePic/${user.email}`, updatedImg)
                            .then(res => {
                                if (res.data.modifiedCount) {
                                    refetch();
                                }
                            })
                            .catch(err => {
                                console.log(err.message)
                            })
                    }
                })
        }
    }



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
        <div className="flex flex-col justify-center items-center gap-10 w-full py-[20px] px-5">

            {/* user intro section */}
            <div className="bg-white shadow-[0_0_70px_#00000028] p-10 flex flex-col justify-center items-center gap-3 w-full relative">
                <img src={user.photo} alt={`${user?.name} image`} className="rounded-full bg-cover z-10 w-[100px] h-[100px]"
                />

                {/* update profile photo */}
                <label
                    htmlFor="photo"
                    className="relative w-fit flex items-center justify-center bg-[#ffffff] z-10 mt-[-10px] cursor-pointer">
                    <span className="text-darkgray underline font-body font-medium text-[12px] text-center">
                        Update profile image
                    </span>
                    <input
                        type="file"
                        name="photo"
                        id="photo"
                        onChange={handleFileChange}
                        className="absolute w-full h-full opacity-0 cursor-pointer"

                    />
                </label>



                <h2 className="mt-4 text-4xl font-body font-bold text-main z-10  text-center">Hi, <span className="text-third">{user?.name}</span></h2>

                <p className="font-body font-semibold text-sub text-[18px] z-10 capitalize">{user.userType}</p>

                <p className="font-body font-medium text-darkgray text-[16px] z-10">Email: <span className="lowercase">{user.email}</span></p>

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