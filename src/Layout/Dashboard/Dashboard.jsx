import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import { FaBars, FaBox, FaHome } from "react-icons/fa";
import useAuthProvider from "../../Hooks/useAuthProvider/useAuthProvider";
import { RiLogoutCircleLine } from "react-icons/ri";
import Swal from 'sweetalert2';



const Dashboard = () => {

    // necessary images
    const logo = "https://i.ibb.co/RbqYPxJ/logo-150-100.png";
    const loadingGif = "https://i.ibb.co/zmckHyD/loading-Gif.gif";


    // hooks + custom hooks
    const navigate = useNavigate();

    // get the current user
    const { currentUser, loading, logOut } = useAuthProvider();

    if (loading) {
        return <div className="h-[100vh] flex justify-center items-center"><img src={loadingGif} alt="" /></div>
    }

    // Logout user
    const handleLogout = () => {
        Swal.fire({
            title: "Do you want to log out?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#001751",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, log out!"
        }).then((result) => {
            if (result.isConfirmed) {
                logOut()
                    .then(() => {
                        navigate("/");
                    })
                    .catch(error => {
                        console.log(error);
                    })
            }
        });
    }


    // user dashboard links
    const userLinks = <>
        <NavLink className="font-sub font-medium text-[16px] flex justify-start items-center gap-4 py-2 px-4 rounded-[30px] duration-300"
            style={({ isActive }) => {
                return {
                    backgroundColor: isActive ? "#16CCF5" : "#16CCF500",
                    color: isActive ? "white" : "black",
                    transition: isActive ? "all .3s" : ""
                }
            }}
            to="/dashboard/home">
            <FaHome />
            User Home
        </NavLink>

        <NavLink className="font-sub font-medium text-[16px] flex justify-start items-center gap-4 py-2 px-4 rounded-[30px] duration-300"
            style={({ isActive }) => {
                return {
                    backgroundColor: isActive ? "#16CCF5" : "#16CCF500",
                    color: isActive ? "white" : "black",
                    transition: isActive ? "all .3s" : ""
                }
            }}
            to="/dashboard/bookparcel">
            <FaBox  />
            Book Parcel
        </NavLink>
    </>





    return (
        <div className="drawer lg:drawer-open">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content p-5">
                <label htmlFor="my-drawer-2" className="drawer-button lg:hidden"><FaBars className="text-xl" /></label>
                <div className="w-full flex justify-center items-center flex-col">
                    {/* Page content here */}
                    <Outlet />
                </div>


            </div>
            <div className="drawer-side">
                <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>


                <div className="flex flex-col justify-start items-start gap-3 bg-white h-full">

                    {/* website logo */}
                    <img src={logo} alt="website logo" className="w-[40%] lg:w-[30%]" />

                    {/* All sidebar routers */}
                    <div className="w-full px-4">

                        {/* current user information */}
                        <div className="flex justify-start items-center gap-4 mt-5">
                            <div className="avatar">
                                <div className="w-14 rounded-full">
                                    <img src={currentUser?.photoURL} alt="Tailwind-CSS-Avatar-component" />
                                </div>
                            </div>
                            <div>
                                <p className="font-heading font-medium text-[18px] text-sub">{currentUser?.displayName}</p>
                            </div>
                        </div>


                        {/* routers for admin / user / delivery man */}
                        <ul className="menu w-80 text-black mt-5 space-y-2">
                            {userLinks}
                        </ul>






                        {/* Normal user routers */}
                        <ul className="menu w-80 text-base-content mt-5 space-y-2">
                            <Link to="/" className="flex justify-start items-center gap-3 font-heading text-sub text-[16px] hover:text-white hover:bg-main py-2 px-4 rounded-[30px] duration-300 font-medium"><FaHome /> Home</Link>
                            <button onClick={handleLogout} className="flex justify-start items-center gap-3 font-heading text-sub text-[16px] hover:text-white hover:bg-main py-2 px-4 rounded-[30px] duration-300 font-medium"><RiLogoutCircleLine /> Log Out</button>
                        </ul>
                    </div>
                </div>


            </div>
        </div>
    );
};

export default Dashboard;