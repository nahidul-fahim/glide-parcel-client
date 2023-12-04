import { useQuery } from "@tanstack/react-query";
import useAuthProvider from "../useAuthProvider/useAuthProvider";
import useAxiosSecure from "../useAxiosSecure/useAxiosSecure";


const useParcels = (filteredBookingStatus) => {

    const axiosSecure = useAxiosSecure();
    const { currentUser } = useAuthProvider();


    const { isPending, data: parcels = [], refetch } = useQuery({
        queryKey: ["parcels", currentUser?.email, filteredBookingStatus],
        queryFn: async () => {
            const res = await axiosSecure.get(`/booking?email=${currentUser?.email}&bookingStatus=${filteredBookingStatus}`)
            return res.data;
        }
    })

    return [isPending, parcels, refetch]
};

export default useParcels;