import { useRef, useState } from "react";
import { AiOutlineLogin } from "react-icons/ai";
import { FaUser, FaUnlockAlt, FaEye, FaEyeSlash } from "react-icons/fa";
import { IoReturnUpBackOutline } from "react-icons/io5";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import useAuthProvider from "../../Hooks/useAuthProvider/useAuthProvider";
import Swal from 'sweetalert2';
import useAxiosOpen from "../../Hooks/useAxiosOpen/useAxiosOpen";



const Login = () => {

    // Hooks and custom hooks
    const [showPassword, setShowPassword] = useState(false);
    const { logInUser, GoogleSignIn } = useAuthProvider();
    // const navigate = useNavigate();
    const loginRef = useRef(null);
    const axiosOpen = useAxiosOpen();



    // Password show-hide manage
    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    }

    // Handle email-password login
    const handleLogin = e => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;

        // Getting the route from where redirected to the login page
        // const from = location.state?.from?.pathname || "/";

        // const logInInfo = { email, password };
        logInUser(email, password)
            .then(res => {
                const user = res.user;

                // success login message if user exists
                if (user) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Login successfull!",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    loginRef.current.reset();
                }
                // navigate(from, { replace: true });
            })
            .catch(error => {

                // failed login message
                Swal.fire({
                    position: "top-end",
                    icon: "error",
                    title: `Oops! ${error}`,
                    showConfirmButton: false,
                    timer: 2000
                });
            })
    }

    
    // Handle Google login
    const handleGoogleSignIn = () => {
        GoogleSignIn()
            .then(res => {
                console.log(res.user);
                const userInfo = {
                    name: res.user?.displayName,
                    email: res.user?.email,
                    userType: "User"
                }
                if (res.user) {
                    // save the userinfo to database
                    axiosOpen.post("/user", userInfo)
                        .then(res => {
                            if (res.data.insertedId) {
                                Swal.fire({
                                    position: "top-end",
                                    icon: "success",
                                    title: "New user created successfully!",
                                    showConfirmButton: false,
                                    timer: 1500
                                });
                            }
                        })
                        .catch(error => {
                            Swal.fire({
                                position: "top-end",
                                icon: "error",
                                title: `Oops! ${error}`,
                                showConfirmButton: false,
                                timer: 4000
                            });
                        })
                }
            })
            .catch(error => {
                Swal.fire({
                    position: "top-end",
                    icon: "error",
                    title: `Oops! ${error}`,
                    showConfirmButton: false,
                    timer: 2000
                });
            })
    }


    return (
        <div className="min-h-[100vh] bg-gradient-to-b from-[#2273dd] via-[#32b4ff] to-main p-5 flex justify-center items-center relative">
            <div className="container mx-auto p-5 flex flex-col justify-center items-center gap-10 ">

                {/* Back to home button */}
                <Link to="/" className="uppercase font-body text-[16px] font-bold flex justify-center items-center text-white hover:text-sub duration-500 gap-2 absolute top-8 left-5"><IoReturnUpBackOutline className="text-2xl font-bold" /> Back to Home</Link>
                <AiOutlineLogin className="text-[190px] text-white" />

                {/* form div */}

                <form ref={loginRef} onSubmit={handleLogin} className="font-heading flex flex-col justify-center items-center gap-7 w-full md:w-[50%] lg:w-[30%]">

                    {/* email input */}
                    <div className="relative flex flex-col justify-center items-center">
                        <input type="email" name="email" placeholder="Your email" id="email" className="w-full focus:outline-none px-[50px] py-2 rounded-[20px]" />
                        <FaUser className="absolute top-3 left-5 text-darkgray" />
                    </div>

                    {/* password input */}
                    <div className="relative flex flex-col justify-center items-center">
                        <input type={showPassword ? "text" : "password"} name="password" placeholder="Your password" id="password" className="w-full focus:outline-none px-[50px] py-2 rounded-[20px]" />
                        <FaUnlockAlt className="absolute top-3 left-5 text-darkgray" />
                        <button onClick={handleShowPassword}>
                            {/* password hide-show functionality */}
                            {
                                showPassword ?
                                    <FaEyeSlash className="absolute top-3 right-5 text-[#8f8f8f]" />
                                    :
                                    <FaEye className="absolute top-3 right-5 text-[#8f8f8f]" />
                            }
                        </button>
                    </div>

                    <input type="submit" value="Login" className="w-[50%] bg-sub text-white rounded-[20px] py-2 font-medium cursor-pointer hover:bg-white hover:text-sub duration-500" />
                </form>


                <p className=" text-center font-body font-semibold text-sub">Not registered yet? <span className="font-semibold text-white border-b-2 pb-1 hover:text-sub hover:border-sub duration-300 font-heading ml-2"><Link to="/register">Register now</Link></span></p>

                <button onClick={handleGoogleSignIn} className="mt-7 font-heading font-medium rounded-[20px] flex justify-center items-center px-10 py-2 bg-white hover:bg-sub hover:text-white duration-500"><FcGoogle className="mr-4 text-xl" /> Continue with Google</button>

            </div>
        </div>
    );
};

export default Login;