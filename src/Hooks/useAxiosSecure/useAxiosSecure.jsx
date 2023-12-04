import axios from "axios";
// import useAuthProvider from "../useAuthProvider/useAuthProvider";
// import { useNavigate } from "react-router-dom";


const axiosSecure = axios.create({
    baseURL: "https://glide-parcel-server.vercel.app"
})

const useAxiosSecure = () => {

    // // hooks + custom hooks
    // const { logOut } = useAuthProvider();
    // const navigate = useNavigate();



    // // request interceptor to add authorization header
    // axiosSecure.interceptors.request.use(function (config) {
    //     const token = localStorage.getItem('access-token');
    //     config.headers.authorization = `Bearer ${token}`
    //     return config;
    // },
    //     function (error) {
    //         console.log("checking error from request", error)
    //         // Do something with request error
    //         return Promise.reject(error);
    //     })



    // // intercepts 401 and 403 status
    // axiosSecure.interceptors.response.use(function (response) {
    //     return response;
    // }, async (error) => {

    //     console.log("checking error", error)
    //     const status = error.response.status;

    //     if (status === 401 || status === 403) {
    //         // await logOut();
    //         // navigate('/login');
    //     }
    //     return Promise.reject(error);
    // })

    return axiosSecure;
};

export default useAxiosSecure;