import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../useAxiosSecure/useAxiosSecure";


const useAllDeliveryMan = () => {

    const axiosSecure = useAxiosSecure();

    const { isPending: deliveryManPending, data: allDeliveryMan = [], refetch: deliveryManRefetch } = useQuery({
        queryKey: ["deliveryMan"],
        queryFn: async () => {
            const res = await axiosSecure.get("/deliveryman")
            return res.data
        }
    })

    return { deliveryManPending, allDeliveryMan, deliveryManRefetch };
};

export default useAllDeliveryMan;