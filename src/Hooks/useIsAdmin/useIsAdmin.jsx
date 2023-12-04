import { useQuery } from "@tanstack/react-query";
import useAuthProvider from "../useAuthProvider/useAuthProvider";
import useAxiosSecure from "../useAxiosSecure/useAxiosSecure";


const useIsAdmin = () => {

    const axiosSecure = useAxiosSecure();
    const { currentUser, loading } = useAuthProvider();

    const { isPending: adminPending ,data: isAdmin } = useQuery({
        queryKey: [currentUser?.email, "isAdmin"],
        enabled: !loading,
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/admin/${currentUser?.email}`);
            return res.data?.admin;
        }
    })

    return {adminPending, isAdmin};
};

export default useIsAdmin;