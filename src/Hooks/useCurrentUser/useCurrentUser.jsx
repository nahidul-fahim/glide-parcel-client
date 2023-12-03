import { useQuery } from "@tanstack/react-query";
import useAuthProvider from "../useAuthProvider/useAuthProvider";
import useAxiosSecure from "../useAxiosSecure/useAxiosSecure";


const useCurrentUser = () => {

    const { currentUser, loading } = useAuthProvider();
    const axiosSecure = useAxiosSecure();


    const { isPending, data: user, refetch } = useQuery({
        queryKey: ["user"],
        enabled: !loading && !!currentUser?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/user/${currentUser?.email}`);
            return res.data;
        }
    })


    return { isPending, user, refetch }
};

export default useCurrentUser;