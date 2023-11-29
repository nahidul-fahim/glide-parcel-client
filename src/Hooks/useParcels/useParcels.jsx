import { useQuery } from "@tanstack/react-query";
import useAuthProvider from "../useAuthProvider/useAuthProvider";
import useAxiosSecure from "../useAxiosSecure/useAxiosSecure";


const useParcels = () => {

    const axiosSecure = useAxiosSecure();
    const { currentUser } = useAuthProvider();


    const { isPending, data: parcels = [], refetch } = useQuery({
        queryKey: ["parcels", currentUser?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/booking?email=${currentUser?.email}`)
            return res.data;
        }
    })

    return [isPending, parcels, refetch]
};

export default useParcels;