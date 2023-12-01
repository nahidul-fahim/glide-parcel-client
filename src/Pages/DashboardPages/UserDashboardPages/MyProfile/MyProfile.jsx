import useCurrentUser from "../../../../Hooks/useCurrentUser/useCurrentUser";



const MyProfile = () => {

    // hooks and custom hooks
    const [isPending, user] = useCurrentUser();


    // Loading state if no data found
    const loadingGif = "https://i.ibb.co/zmckHyD/loading-Gif.gif";
    if (isPending) {
        return <div className="h-[100vh] flex justify-center items-center"><img src={loadingGif} alt="" /></div>
    }








    return (
        <div className="flex flex-col justify-center items-center">
            <div className="bg-lightgray p-10">
                {/* <img src={user} alt="" /> */}
            </div>
        </div>
    );
};

export default MyProfile;