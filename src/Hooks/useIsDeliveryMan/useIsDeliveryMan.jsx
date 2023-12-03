import { useQuery } from "@tanstack/react-query";
import useAuthProvider from "../useAuthProvider/useAuthProvider";
import useAxiosSecure from "../useAxiosSecure/useAxiosSecure";


const useIsDeliveryMan = () => {

    const axiosSecure = useAxiosSecure();
    const { currentUser } = useAuthProvider();


    const { isPending: deliveryManPending, data: isDeliveryMan } = useQuery({
        queryKey: [currentUser?.email, "isDeliveryMan"],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/deliveryman/${currentUser?.email}`);
            return res.data?.deliveryMan;
        }
    })

    return { deliveryManPending, isDeliveryMan };
};

export default useIsDeliveryMan;