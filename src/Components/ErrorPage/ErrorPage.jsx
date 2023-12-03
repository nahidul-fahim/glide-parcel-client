import { Link } from "react-router-dom";


// 404 image
const bgimg = "https://i.ibb.co/qYw8GFh/img-404.png";


const ErrorPage = () => {
    return (
        <div className="h-[100vh] flex flex-col justify-center md:justify-center items-center md:items-start p-5 md:p-10"
            style={{
                backgroundImage: `linear-gradient(to bottom, #00000040, #00000040), url(${bgimg})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
            }}>
            <h2 className="font-heading text-[140px] font-bold text-white">404</h2>
            <h3 className="text-3xl font-bold text-lightgray text-center mt-[-30px]">Whoops! This is not the parcel {'you\'re'} looking for</h3>
            <Link to="/"><button className="bg-white text-third px-7 py-2 rounded-[40px] hover:bg-third hover:text-white duration-500 font-heading font-semibold text-[18px] mt-8">Back to Home</button></Link>
        </div>
    );
};

export default ErrorPage;