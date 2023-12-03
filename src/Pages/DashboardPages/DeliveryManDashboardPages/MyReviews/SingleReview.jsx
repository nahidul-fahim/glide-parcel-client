import { Rating } from '@smastrom/react-rating'
import '@smastrom/react-rating/style.css'

const SingleReview = ({ review }) => {


    console.log(review);

    return (
        <div className="p-10 flex flex-col justify-center items-center gap-5 relative shadow-[0_0_150px_-10px_#B8B8B847] hover:shadow-[#0057FF21] duration-300 rounded-md">
            <img src={review?.reviewerImg} alt="reviewer image" className="w-[200px] h-[200px] rounded-full" />
            <div className="flex justify-center items-center text-center flex-col gap-4 font-body">
                <h3 className="text-xl font-bold text-main">{review?.reviewer}</h3>
                <Rating
                    style={{ maxWidth: 120 }}
                    value={review?.rating}
                    readOnly
                />
                <p className='text-darkgray'>{review?.feedback}</p>
                <p className='text-darkgray absolute top-5 right-5 font-medium'>{review?.reviewDate}</p>
            </div>
        </div>
    );
};

export default SingleReview;