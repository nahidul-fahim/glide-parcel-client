import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../useAxiosSecure/useAxiosSecure";
import useCurrentUser from "../useCurrentUser/useCurrentUser";


const useDeliveries = () => {

    const axiosSecure = useAxiosSecure();
    const { user } = useCurrentUser();


    const deliveryManId = user?._id + " " + user?.name;


    const { isPending: DelieryListPending, data: allDeliveries = [], refetch: DeliveryListRefetch } = useQuery({
        queryKey: ["allDeliveries"],
        enabled: !!user?._id,
        queryFn: async () => {
            const res = await axiosSecure.get(`/deliveries/${deliveryManId}`)
            return res.data;
        }
    })

    return { DelieryListPending, allDeliveries, DeliveryListRefetch }
};

export default useDeliveries;