import { useQuery } from "@tanstack/react-query";
import useAuthProvider from "../useAuthProvider/useAuthProvider";
import useAxiosSecure from "../useAxiosSecure/useAxiosSecure";


const useIsAdmin = () => {

    const axiosSecure = useAxiosSecure();
    const { currentUser } = useAuthProvider();

    const { data: isAdmin } = useQuery({
        queryKey: [currentUser?.email, "isAdmin"],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/admin/${currentUser?.email}`);
            return res.data?.admin;
        }
    })

    return [isAdmin];
};

export default useIsAdmin;