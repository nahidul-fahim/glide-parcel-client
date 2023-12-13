import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure/useAxiosSecure";


//images + gif
const loadingGif = "https://i.ibb.co/zmckHyD/loading-Gif.gif";


const Community = () => {


    // hooks and custom hooks
    const axiosSecure = useAxiosSecure();

    const { isPending: reviewsPending, data: allReviews } = useQuery({
        queryKey: ["all-reviews"],
        queryFn: async () => {
            const res = await axiosSecure.get("/allreviews");
            return res.data;
        }
    })


    // Loading state if no data found
    if (reviewsPending) {
        return <div className="h-[100vh] flex justify-center items-center"><img src={loadingGif} alt="" /></div>
    }


    console.log(allReviews)





    return (
        <div className="container flex flex-col justify-center items-center gap-10 py-5">

            <h2 className="text-5xl font-heading text-third font-bold">Our <span className="text-main">Community</span></h2>

            <div className="min-h-[100vh] w-full">
                {
                    allReviews.map(review =>
                        <div key={review?._id}
                            className="bg-lightmain w-full md:w-[90%] mb-8 px-5 py-4 rounded text-black flex flex-col justify-center items-start font-body">
                            <p className="text-darkgray mb-2">{review?.reviewDate}</p>
                            <p><span className="font-medium">{review?.deliveryMan}</span> got a new <span className="font-semibold">{review?.rating}⭐</span> rating. <span className="font-semibold">Congratulations! 🎉</span></p>
                        </div>)
                }
            </div>


        </div>
    );
};

export default Community;