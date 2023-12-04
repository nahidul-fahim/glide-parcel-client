import { Navigate, useLocation } from "react-router-dom";
import useAuthProvider from "../../Hooks/useAuthProvider/useAuthProvider";

// images
const loadingGif = "https://i.ibb.co/zmckHyD/loading-Gif.gif";


const PrivateRoute = ({ children }) => {

    // hooks and custom hooks
    const { currentUser, loading } = useAuthProvider();

    const location = useLocation();

    if (loading) {
        return <div className="h-[100vh] flex justify-center items-center"><img src={loadingGif} alt="loading gif" /></div>
    }

    if (currentUser) {
        return children;
    }


    return <Navigate state={{ from: location }} to="/login" replace />
    // return <Navigate state={location.pathname} to="/login"></Navigate>
};

export default PrivateRoute;