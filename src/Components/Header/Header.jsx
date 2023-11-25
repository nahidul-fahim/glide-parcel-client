import { Link, NavLink } from "react-router-dom";
import { IoMenuSharp } from "react-icons/io5";
import useAuthProvider from "../../Hooks/useAuthProvider/useAuthProvider";



const Header = () => {

    // hooks and stats
    const { currentUser, loading, logOut } = useAuthProvider();

    if (loading) {
        return <span className="loading loading-infinity text-main loading-md"></span>
    }

    console.log(currentUser);


    // website logo
    const logo = "https://i.ibb.co/CvXjwC7/logo-150-100.png";


    // navigation bar links
    const navlinks = <>
        <NavLink className="uppercase font-heading font-semibold text-[16px]"
            style={({ isActive }) => {
                return {
                    color: isActive ? "#21BFDB" : "#00273E",
                    // transform: isActive ? "scale(1.1)" : "scale(1)",
                    transition: isActive ? "all 1s" : ""
                }
            }}
            to="/">
            Home
        </NavLink>

        <NavLink className="uppercase font-heading font-semibold text-[16px]"
            style={({ isActive }) => {
                return {
                    color: isActive ? "#21BFDB" : "#00273E",
                    // transform: isActive ? "scale(1.1)" : "scale(1)",
                    transition: isActive ? "all 1s" : ""
                }
            }}
            to="/dashboard">
            Dashboard
        </NavLink>
    </>

    // user-profile links
    const userLinks = <div className="flex flex-col gap-5 font-heading">
        <img src={currentUser?.photoURL} alt="profile picture" className="w-[50px] h-[50px] mx-auto" />
        <p className="text-center text-[18px] text-sub font-bold">{currentUser?.displayName}</p>

        <NavLink className="uppercase font-heading font-semibold text-[16px]"
            style={({ isActive }) => {
                return {
                    color: isActive ? "#21BFDB" : "#00273E",
                    transform: isActive ? "translate(10px,0px)" : "",
                    transition: isActive ? "all 1s" : ""
                }
            }}
            to="/dashboard">
            Dashboard
        </NavLink>

        <button onClick={() => logOut()} className="bg-main px-5 py-2 rounded-[20px] font-heading uppercase font-semibold text-white hover:bg-sub duration-500">Logout</button>

    </div>






    return (
        <div className="px-5 flex justify-between items-center">
            <div className="navbar bg-base-100">

                {/* logo and medium + small device navigation side */}
                <div className="navbar-start">
                    <div className="dropdown">
                        <label tabIndex={0} className="btn btn-ghost lg:hidden">
                            <IoMenuSharp className="text-2xl font-bold text-sub" />
                        </label>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-5 shadow bg-white rounded-md w-52 space-y-5">
                            {navlinks}
                        </ul>
                    </div>
                    <Link to="/"><img src={logo} alt="" /></Link>
                </div>

                {/* navigation side */}
                <div className="navbar-end flex justify-end items-center gap-8">

                    {/* large device navlinks */}
                    <div className="hidden lg:flex">
                        <ul className="menu menu-horizontal px-1 space-x-5">
                            {navlinks}
                        </ul>
                    </div>

                    {/* conditional user profile section */}

                    {
                        currentUser ?
                            <div className="dropdown dropdown-end">
                                <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                                    <div className="w-10 rounded-full">
                                        <img alt="Tailwind CSS Navbar component" src={currentUser?.photoURL} />
                                    </div>
                                </label>
                                <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-5 shadow bg-white rounded-box w-52">
                                    {userLinks}
                                </ul>
                            </div>
                            :
                            <Link to="/login"><button className="bg-main px-5 py-2 rounded-[20px] font-heading uppercase font-semibold text-white hover:bg-sub duration-500">Login</button></Link>
                    }

                </div>

            </div>

        </div>
    );
};

export default Header;