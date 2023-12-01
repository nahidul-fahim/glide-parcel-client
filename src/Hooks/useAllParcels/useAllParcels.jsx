import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../useAxiosSecure/useAxiosSecure";


const useAllParcels = () => {

    const axiosSecure = useAxiosSecure();

    const { isPending, data: allparcels = [], refetch } = useQuery({
        queryKey: ["allParcels"],
        queryFn: async () => {
            const res = await axiosSecure.get("/allbookings")
            return res.data;
        }
    })

    return {isPending, allparcels, refetch}
};

export default useAllParcels;