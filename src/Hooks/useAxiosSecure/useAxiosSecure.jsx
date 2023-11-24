import axios from "axios";
import { useNavigate } from "react-router-dom";
import useAuthProvider from "../useAuthProvider/useAuthProvider";


const axiosSecure = axios.create({
    baseURL: 'http://localhost:5000',
    // withCredentials: true,
})

const useAxiosSecure = () => {

    const navigate = useNavigate();
    const { LogOut } = useAuthProvider();

    // request interceptor to add authorization header
    axiosSecure.interceptors.request.use(function (config) {
        const token = localStorage.getItem('access-token');
        config.headers.authorization = `Bearer ${token}`
        return config;
    },
        function (error) {
            // Do something with request error
            return Promise.reject(error);
        })


    // intercepts 401 and 403 status
    axiosSecure.interceptors.response.use(function (response) {
        return response;
    }, async (error) => {
        const status = error.response.status;
        console.log(error);

        if (status === 401 || status === 403) {
            await LogOut();
            navigate('/login');
        }
        return Promise.reject(error);
    })



    return axiosSecure;
};

export default useAxiosSecure;