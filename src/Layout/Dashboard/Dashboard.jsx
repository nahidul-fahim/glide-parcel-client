import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import { FaBars, FaBox, FaBoxes, FaHome, FaUser, FaRegChartBar, FaLayerGroup, FaUsers, FaList, FaStar,FaHandsHelping } from "react-icons/fa";
import useAuthProvider from "../../Hooks/useAuthProvider/useAuthProvider";
import { RiLogoutCircleLine } from "react-icons/ri";
import { FaPersonBiking } from "react-icons/fa6";
import Swal from 'sweetalert2';
import useCurrentUser from "../../Hooks/useCurrentUser/useCurrentUser";
import useIsAdmin from "../../Hooks/useIsAdmin/useIsAdmin";
import useIsDeliveryMan from "../../Hooks/useIsDeliveryMan/useIsDeliveryMan";
import { useEffect } from "react";



const Dashboard = () => {

    // images
    const logo = "https://i.ibb.co/RbqYPxJ/logo-150-100.png";
    const loadingGif = "https://i.ibb.co/zmckHyD/loading-Gif.gif";


    // hooks + custom hooks
    const navigate = useNavigate();
    const { loading, logOut } = useAuthProvider();
    const { isPending, user } = useCurrentUser();
    const { adminPending, isAdmin } = useIsAdmin();
    const { deliveryManPending, isDeliveryMan } = useIsDeliveryMan();



    // redirect the admin and delivery man to a specific route
    useEffect(() => {
        const adminRedireact = () => {
            if (isAdmin) {
                navigate("/dashboard/statistics")
            }
        }

        const deliveryManRedirect = () => {
            if (isDeliveryMan) {
                navigate("/dashboard/mydeliverylist")
            }
        }

        if (!adminPending || !deliveryManPending) {
            adminRedireact();
            deliveryManRedirect();
        }

    }, [isAdmin, navigate, adminPending, deliveryManPending, isDeliveryMan])






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
                        navigate("/login");
                    })
                    .catch(error => {
                        console.log(error);
                    })
            }
        });
    }


    // admin dashboard links
    const adminLinks = <>
        {/* statistics */}
        <NavLink className="font-heading font-medium text-[16px] flex justify-start items-center gap-4 py-2 px-4 rounded-[30px] duration-300"
            style={({ isActive }) => {
                return {
                    backgroundColor: isActive ? "#16CCF5" : "#16CCF500",
                    color: isActive ? "white" : "black",
                    transition: isActive ? "all .3s" : ""
                }
            }}
            to="/dashboard/statistics">
            <FaRegChartBar />
            Statistics
        </NavLink>

        {/* all parcels */}
        <NavLink className="font-heading font-medium text-[16px] flex justify-start items-center gap-4 py-2 px-4 rounded-[30px] duration-300"
            style={({ isActive }) => {
                return {
                    backgroundColor: isActive ? "#16CCF5" : "#16CCF500",
                    color: isActive ? "white" : "black",
                    transition: isActive ? "all .3s" : ""
                }
            }}
            to="/dashboard/allparcels">
            <FaLayerGroup />
            All Parcels
        </NavLink>

        {/* all delivery man */}
        <NavLink className="font-heading font-medium text-[16px] flex justify-start items-center gap-4 py-2 px-4 rounded-[30px] duration-300"
            style={({ isActive }) => {
                return {
                    backgroundColor: isActive ? "#16CCF5" : "#16CCF500",
                    color: isActive ? "white" : "black",
                    transition: isActive ? "all .3s" : ""
                }
            }}
            to="/dashboard/alldeliveryman">
            <FaPersonBiking />
            All Deliveryman
        </NavLink>

        {/* all users */}
        <NavLink className="font-heading font-medium text-[16px] flex justify-start items-center gap-4 py-2 px-4 rounded-[30px] duration-300"
            style={({ isActive }) => {
                return {
                    backgroundColor: isActive ? "#16CCF5" : "#16CCF500",
                    color: isActive ? "white" : "black",
                    transition: isActive ? "all .3s" : ""
                }
            }}
            to="/dashboard/allusers">
            <FaUsers />
            All Users
        </NavLink>
    </>



    // delivery man dashboard links
    const deliveryManLinks = <>
        {/* my delivery list */}
        <NavLink className="font-heading font-medium text-[16px] flex justify-start items-center gap-4 py-2 px-4 rounded-[30px] duration-300"
            style={({ isActive }) => {
                return {
                    backgroundColor: isActive ? "#16CCF5" : "#16CCF500",
                    color: isActive ? "white" : "black",
                    transition: isActive ? "all .3s" : ""
                }
            }}
            to="/dashboard/mydeliverylist">
            <FaList />
            My delivery list
        </NavLink>

        {/* my reviews */}
        <NavLink className="font-heading font-medium text-[16px] flex justify-start items-center gap-4 py-2 px-4 rounded-[30px] duration-300"
            style={({ isActive }) => {
                return {
                    backgroundColor: isActive ? "#16CCF5" : "#16CCF500",
                    color: isActive ? "white" : "black",
                    transition: isActive ? "all .3s" : ""
                }
            }}
            to="/dashboard/myreviews">
            <FaStar />
            My reviews
        </NavLink>

        {/* community */}
        <NavLink className="font-heading font-medium text-[16px] flex justify-start items-center gap-4 py-2 px-4 rounded-[30px] duration-300"
            style={({ isActive }) => {
                return {
                    backgroundColor: isActive ? "#16CCF5" : "#16CCF500",
                    color: isActive ? "white" : "black",
                    transition: isActive ? "all .3s" : ""
                }
            }}
            to="/dashboard/community">
            <FaHandsHelping   />
            Community
        </NavLink>
    </>



    // user dashboard links
    const userLinks = <>

        <NavLink className="font-heading font-medium text-[16px] flex justify-start items-center gap-4 py-2 px-4 rounded-[30px] duration-300"
            style={({ isActive }) => {
                return {
                    backgroundColor: isActive ? "#16CCF5" : "#16CCF500",
                    color: isActive ? "white" : "black",
                    transition: isActive ? "all .3s" : ""
                }
            }}
            to="/dashboard/myprofile">
            <FaUser />
            My Profile
        </NavLink>

        <NavLink className="font-heading font-medium text-[16px] flex justify-start items-center gap-4 py-2 px-4 rounded-[30px] duration-300"
            style={({ isActive }) => {
                return {
                    backgroundColor: isActive ? "#16CCF5" : "#16CCF500",
                    color: isActive ? "white" : "black",
                    transition: isActive ? "all .3s" : ""
                }
            }}
            to="/dashboard/bookparcel">
            <FaBox />
            Book Parcel
        </NavLink>

        <NavLink className="font-heading font-medium text-[16px] flex justify-start items-center gap-4 py-2 px-4 rounded-[30px] duration-300"
            style={({ isActive }) => {
                return {
                    backgroundColor: isActive ? "#16CCF5" : "#16CCF500",
                    color: isActive ? "white" : "black",
                    transition: isActive ? "all .3s" : ""
                }
            }}
            to="/dashboard/myparcels">
            <FaBoxes />
            My Parcels
        </NavLink>

    </>



    if (loading || adminPending || deliveryManPending) {
        return <div className="h-[100vh] flex justify-center items-center"><img src={loadingGif} alt="" /></div>
    }




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
            <div className="drawer-side z-[99]">
                <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>


                <div className="flex flex-col justify-start items-start gap-3 bg-white h-full">

                    {/* website logo */}
                    <img src={logo} alt="website logo" className="w-[40%] lg:w-[30%]" />

                    {/* All sidebar routers */}
                    <div className="w-full px-4">

                        {/* current user information */}
                        {
                            isPending ?
                                <span className="flex justify-center items-center loading loading-infinity text-main loading-md"></span>
                                :
                                <div className="flex justify-start items-center gap-4 mt-5">
                                    <div className="avatar">
                                        <div className="w-14 rounded-full">
                                            <img src={user?.photo} alt="Current user" />
                                        </div>
                                    </div>
                                    <div>
                                        <p className="font-heading font-medium text-[18px] text-third capitalize">{user?.name}</p>
                                        <p className="font-heading font-medium text-[15px] text-[#b4b4b4] capitalize">{user?.userType}</p>
                                    </div>
                                </div>
                        }


                        {/* validation and showing routers for admin / user / delivery man */}
                        <ul className="menu w-80 text-black mt-5 space-y-2">
                            {
                                isAdmin ?
                                    <>{adminLinks}</>
                                    :
                                    isDeliveryMan ?
                                        (<>{deliveryManLinks}</>)
                                        :
                                        (<>{userLinks}</>)
                            }
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