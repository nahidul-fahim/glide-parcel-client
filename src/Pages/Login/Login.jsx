import { useRef, useState } from "react";
import { AiOutlineLogin } from "react-icons/ai";
import { FaUser, FaUnlockAlt, FaEye, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import useAuthProvider from "../../Hooks/useAuthProvider/useAuthProvider";
import Swal from 'sweetalert2';


const Login = () => {

    // Hooks and custom hooks
    const [showPassword, setShowPassword] = useState(false);
    const { logInUser } = useAuthProvider();
    // const navigate = useNavigate();
    const loginRef = useRef(null);

    // Password show-hide manage
    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    }

    // Login form submission
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
                console.log(user);
                loginRef.current.reset();
                // success login message
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Login successfull!",
                    showConfirmButton: false,
                    timer: 1500
                });
                // navigate(from, { replace: true });
            })
            .catch(error => {
                // failed login message
                Swal.fire({
                    position: "top-end",
                    icon: "error",
                    title: `Oops! ${error}`,
                    showConfirmButton: false,
                    timer: 1500
                });
            })
    }


    return (
        <div className="min-h-[100vh] bg-gradient-to-b from-[#2273dd] via-[#32b4ff] to-main p-5 flex justify-center items-center">
            <div className="container mx-auto p-5 flex flex-col justify-center items-center gap-10">
                <AiOutlineLogin className="text-[190px] text-white" />

                {/* form div */}

                <form onSubmit={handleLogin} className="font-heading flex flex-col justify-center items-center gap-7 w-full md:w-[50%] lg:w-[30%]">
                    <div className="relative flex flex-col justify-center items-center">
                        <input type="email" name="email" placeholder="Your email" id="email" className="w-full focus:outline-none px-[50px] py-2 rounded-[20px]" />
                        <FaUser className="absolute top-3 left-5 text-darkgray" />
                    </div>

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

                <button className="mt-7 font-heading font-medium rounded-[20px] flex justify-center items-center px-10 py-2 bg-white hover:bg-sub hover:text-white duration-500"><FcGoogle className="mr-4 text-xl" /> Continue with Google</button>

            </div>
        </div>
    );
};

export default Login;