import useAuthProvider from "../useAuthProvider/useAuthProvider";



const useLoadedUser = () => {

    const { currentUser, loading } = useAuthProvider();

    if (loading) {
        return <p>loading...</p>;
    }
    else {
        console.log(currentUser);
        return currentUser;
    }
};

export default useLoadedUser;