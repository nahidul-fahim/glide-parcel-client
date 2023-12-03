import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure/useAxiosSecure";
import useCurrentUser from "../../../../Hooks/useCurrentUser/useCurrentUser";
import SingleReview from "./SingleReview";

//images + gif
const loadingGif = "https://i.ibb.co/zmckHyD/loading-Gif.gif";


const MyReviews = () => {

    // hooks and custom hooks
    const axiosSecure = useAxiosSecure();
    const { isPending: userPending, user } = useCurrentUser();


    const { isPending: reviewsPending, data: allReviews = [] } = useQuery({
        queryKey: ["allReviews"],
        enabled: !!user?._id,
        queryFn: async () => {
            const res = await axiosSecure.get(`/reviews/${user?._id}`)
            return res.data;
        }
    })


    // conditional loading
    if (userPending || reviewsPending) {
        return <div className="h-[100vh] flex justify-center items-center"><img src={loadingGif} alt="" /></div>
    }



    return (
        <div className="container flex flex-col justify-center items-center gap-10 py-5">
            <h2 className="text-5xl font-heading text-third font-bold">My <span className="text-main">Reviews</span></h2>

            {/* show card for reviewer */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {
                    allReviews.map(review => <SingleReview
                        key={review._id}
                        review={review}>
                    </SingleReview>)
                }
            </div>


        </div>
    );
};

export default MyReviews;