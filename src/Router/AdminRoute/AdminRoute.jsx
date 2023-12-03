import { Navigate, useLocation } from "react-router-dom";
import useAuthProvider from "../../Hooks/useAuthProvider/useAuthProvider";
import useIsAdmin from "../../Hooks/useIsAdmin/useIsAdmin";

// images
const loadingGif = "https://i.ibb.co/zmckHyD/loading-Gif.gif";


const AdminRoute = ({ children }) => {

    // hooks and custom hooks
    const { adminPending, isAdmin } = useIsAdmin();
    const { currentUser, loading } = useAuthProvider();
    const location = useLocation();

    if (loading || adminPending) {
        return <div className="h-[100vh] flex justify-center items-center"><img src={loadingGif} alt="loading gif" /></div>
    }

    if (currentUser && isAdmin) {
        return children;
    }

    // console.log(location);

    return <Navigate state={{ from: location }} to="/login" />
    // return <Navigate state={location.pathname} to="/login"></Navigate>
};

export default AdminRoute;