import { useState } from "react";
import { AiOutlineUserAdd } from "react-icons/ai";
import { FaUser, FaUnlockAlt, FaEye, FaEyeSlash, FaEnvelope, FaUserCircle  } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";


const Register = () => {

    // Hooks and custom hooks
    const [showPassword, setShowPassword] = useState(false);

    // Password show-hide manage
    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    }


    // Submission of register form
    const handleRegister = e => {
        e.preventDefault();
    }




    return (
        <div className="min-h-[100vh] bg-gradient-to-b from-main via-[#32b4ff] to-[#2273dd] p-5 flex justify-center items-center">
            <div className="container mx-auto p-5 flex flex-col justify-center items-center gap-10">
                <AiOutlineUserAdd className="text-[190px] text-white" />

                {/* form div */}

                <form onSubmit={handleRegister}
                    className="font-heading flex flex-col justify-center items-center gap-7 w-full md:w-[50%] lg:w-[30%]">
                    <div className="relative flex flex-col justify-center items-center">
                        <input required type="text" name="name" placeholder="Your name" id="name" className="w-full focus:outline-none px-[50px] py-2 rounded-[20px]" />
                        <FaUser className="absolute top-3 left-5 text-darkgray" />
                    </div>

                    <div className="relative flex flex-col justify-center items-center">
                        <input required type="email" name="email" placeholder="Your email" id="email" className="w-full focus:outline-none px-[50px] py-2 rounded-[20px]" />
                        <FaEnvelope className="absolute top-3 left-5 text-darkgray" />
                    </div>

                    <div className="relative flex flex-col justify-center items-center">
                        <input required type={showPassword ? "text" : "password"} name="password" placeholder="Your password" id="password" className="w-full focus:outline-none px-[50px] py-2 rounded-[20px]" />
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

                    <div className="relative flex flex-col justify-center items-center">
                        <input required type="text" name="photo" placeholder="Your photo" id="photo" className="w-full focus:outline-none px-[50px] py-2 rounded-[20px]" />
                        <FaUserCircle className="absolute top-3 left-5 text-darkgray" />
                    </div>

                    <input type="submit" value="Register" className="w-[50%] bg-sub text-white rounded-[20px] py-2 font-medium cursor-pointer hover:bg-white hover:text-sub duration-500" />
                </form>


                <p className=" text-center font-body font-semibold text-sub">Already have an account? <span className="font-semibold text-white border-b-2 pb-1 hover:text-sub hover:border-sub duration-300 font-heading ml-2"><Link to="/login">Login</Link></span></p>

                <button className="mt-7 font-heading font-medium rounded-[20px] flex justify-center items-center px-10 py-2 bg-white hover:bg-sub hover:text-white duration-500"><FcGoogle className="mr-4 text-xl" /> Continue with Google</button>

            </div>
        </div>
    );
};

export default Register;