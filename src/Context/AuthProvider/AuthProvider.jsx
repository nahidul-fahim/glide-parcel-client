import { createContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import app from "../../Firebase/firebase.config";

export const AuthContext = createContext(null);
const auth = getAuth(app);


const AuthProvider = ({ children }) => {

    // Hooks and states
    const [loading, setLoading] = useState(true);
    const [currentUser, setCurrenUser] = useState(null);


    // Create user using email-password
    const createNewUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }

    // Update the current user profile
    const updateUser = (user, name, photo) => {
        return updateProfile(user, {
            displayName: name,
            photoURL: photo
        })
    }


    // Login user with email-password
    const logInUser = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }


    // Logout the current user
    const logOut = () => {
        setLoading(true);
        return signOut(auth);
    }



    // Track the current user
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, user => {
            setCurrenUser(user);
            setLoading(false);
        });
        return () => unsubscribe();
    }, [])


    console.log(currentUser);



    const authInfo = { createNewUser, loading, updateUser, logInUser, currentUser, logOut }


    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;