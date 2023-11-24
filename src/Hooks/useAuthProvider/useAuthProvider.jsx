import { useContext } from "react";
import { AuthContext } from "../../Context/AuthProvider/AuthProvider";

const useAuthProvider = () => {

    const info = useContext(AuthContext);

    return info;
};

export default useAuthProvider;