import { useRef, useState } from "react";
import { AiOutlineUserAdd } from "react-icons/ai";
import { FaUser, FaUnlockAlt, FaEye, FaEyeSlash, FaEnvelope, FaPhone } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { IoReturnUpBackOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import useAuthProvider from "../../Hooks/useAuthProvider/useAuthProvider";
import Swal from 'sweetalert2';
import useAxiosOpen from "../../Hooks/useAxiosOpen/useAxiosOpen";
import { FaUpload } from "react-icons/fa";
import axios from "axios";


// image hosting api and url
const imageHostngApiKey = import.meta.env.VITE_IMAGE_HOSTING_SECRETKEY;
const imageUploadUrl = `https://api.imgbb.com/1/upload?key=${imageHostngApiKey}`;


const Register = () => {

    // Hooks and states
    const [showPassword, setShowPassword] = useState(false);
    const [passwordError, setPasswordError] = useState('');
    const { createNewUser, updateUser, GoogleSignIn } = useAuthProvider();
    const formRef = useRef(null);
    const axiosOpen = useAxiosOpen();
    //file to send in imgbb
    const [selectedFile, setSelectedFile] = useState(null);
    //file name to show on display
    const [selectedImage, setSelectedImage] = useState('');




    // handlge file name change when image selected
    const handleFileChange = e => {
        e.preventDefault();
        const fileInput = e.target;
        if (fileInput.files.length > 0) {
            setSelectedFile(e.target.files[0])
            setSelectedImage(fileInput.files[0].name)
        }
        else {
            setSelectedImage('')
        }
    }



    // Password show-hide state manage
    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    }


    // Submission of register form
    const handleRegister = e => {
        e.preventDefault();

        // send image to imgbb hositng
        const formData = new FormData();
        formData.append('image', selectedFile);

        axios.post(imageUploadUrl, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            params: {
                key: imageHostngApiKey,
            },
        })
            .then(res => {
                if (res.data.success) {
                    const photo = res.data.data.display_url;
                    const form = e.target;
                    const name = form.name.value;
                    const email = form.email.value;
                    const phone = form.phone.value;
                    const password = form.password.value;
                    const userType = form.userType.value.toLowerCase();


                    const userInfo = { name, email, phone, photo, userType };


                    // password validation checker
                    const regExPattern = /^(?=.*[A-Z])(?=.*[\W_]).{6,}$/;

                    setPasswordError('');

                    if (!regExPattern.test(password)) {
                        return setPasswordError("Must be at least 6 characters long and contain 1 capital letter, 1 special character");
                    }

                    createNewUser(email, password)
                        .then(res => {
                            const user = res.user;
                            if (user) {
                                updateUser(user, name, photo)
                                    .then(() => {

                                        // save the user to the database
                                        axiosOpen.post("/user", userInfo)
                                            .then(res => {
                                                if (res.data.insertedId) {
                                                    formRef.current.reset();
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
                                    })
                                    .catch(error => {
                                        Swal.fire({
                                            position: "top-end",
                                            icon: "error",
                                            title: `Oops! ${error}`,
                                            showConfirmButton: false,
                                            timer: 1500
                                        });
                                    })
                            }
                        })
                        .catch(error => {
                            Swal.fire({
                                position: "top-end",
                                icon: "error",
                                title: `Oops! ${error.code}`,
                                showConfirmButton: false,
                                timer: 1500
                            });
                        })
                }
            })

    }


    // Handle Google Login
    const handleGoogleSignIn = () => {
        GoogleSignIn()
            .then(res => {
                const userInfo = {
                    name: res.user?.displayName,
                    email: res.user?.email,
                    photo: res.user?.photoURL,
                    userType: "user"
                }
                if (res.user) {

                    // save the userinfo to database
                    axiosOpen.post("/user", userInfo)
                        .then(res => {
                            if (res.data.insertedId) {
                                formRef.current.reset();
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
        <div className="min-h-[100vh] bg-gradient-to-b from-main via-[#32b4ff] to-[#2273dd] p-5 flex justify-center items-center relative">
            <div className="container mx-auto p-5 flex flex-col justify-center items-center gap-10">
                <AiOutlineUserAdd className="text-[190px] text-white" />
                {/* Back to home button */}
                <Link to="/" className="uppercase font-body text-[16px] font-bold flex justify-center items-center text-white hover:text-sub duration-500 gap-2 absolute top-8 left-5"><IoReturnUpBackOutline className="text-2xl font-bold" /> Back to Home</Link>

                {/* form div */}

                <form ref={formRef} onSubmit={handleRegister}
                    className="font-heading flex flex-col justify-center items-center gap-7 w-full md:w-[50%] lg:w-[30%]">

                    {/* name input */}
                    <div className="relative flex flex-col justify-center items-center">
                        <input required type="text" name="name" placeholder="Your name" id="name" className="w-full focus:outline-none px-[50px] py-2 rounded-[20px]" />
                        <FaUser className="absolute top-3 left-5 text-darkgray" />
                    </div>

                    {/* email input */}
                    <div className="relative flex flex-col justify-center items-center">
                        <input required type="email" name="email" placeholder="Your email" id="email" className="w-full focus:outline-none px-[50px] py-2 rounded-[20px]" />
                        <FaEnvelope className="absolute top-3 left-5 text-darkgray" />
                    </div>

                    {/* phone number input */}
                    <div className="relative flex flex-col justify-center items-center">
                        <input required type="tel" name="phone" placeholder="Your phone" id="phone" className="w-full focus:outline-none px-[50px] py-2 rounded-[20px]" />
                        <FaPhone className="absolute top-3 left-5 text-darkgray" />
                    </div>

                    {/* password input */}
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
                        {
                            passwordError ? <p className="text-[#882525] mt-2 text-[14px] font-body w-[80%]">{passwordError}</p> : ''
                        }
                    </div>


                    {/* photo input */}
                    <label
                        htmlFor="photo"
                        className="relative flex items-center justify-start w-[87%] lg:w-[85%] h-10 cursor-pointer bg-[#ffffff] text-darkgray rounded-[40px]">
                        <span className="text-darkgray font-heading font-medium ml-[50px]">
                            {selectedImage || 'Your profile image'}
                        </span>
                        <input
                            type="file"
                            name="photo"
                            id="photo"
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                            onChange={handleFileChange}
                        />
                        <FaUpload className="absolute top-3 left-5 text-darkgray" />
                    </label>


                    {/* Select user type */}
                    <select defaultValue="Select your role" required name="userType" id="userType" className="select select-bordered w-[88%] lg:w-[85%] focus:outline-none px-[20px] rounded-[20px] text-[16px]">
                        <option disabled value="Select your role" className="text-sub">Select your role</option>
                        <option>User</option>
                        <option>Delivery man</option>
                    </select>


                    {/* submit button */}
                    <input type="submit" value="Register" className="w-[50%] bg-sub text-white rounded-[20px] py-2 font-medium cursor-pointer hover:bg-white hover:text-sub duration-500" />
                </form>

                {/* Login route toggle */}
                <p className=" text-center font-body font-semibold text-sub">Already have an account? <span className="font-semibold text-white border-b-2 pb-1 hover:text-sub hover:border-sub duration-300 font-heading ml-2"><Link to="/login">Login</Link></span></p>

                {/* Social signup */}
                <button onClick={handleGoogleSignIn} className="mt-7 font-heading font-medium rounded-[20px] flex justify-center items-center px-10 py-2 bg-white hover:bg-sub hover:text-white duration-500"><FcGoogle className="mr-4 text-xl" />Continue with Google</button>
            </div>
        </div>
    );
};

export default Register;