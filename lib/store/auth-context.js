"use client";

import { createContext, useEffect, useState } from "react";

import { auth } from "@/lib/firebase";
import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { useAuthState } from 'react-firebase-hooks/auth';

export const authContext = createContext({
    user : null,
    loading : false,
    googleLoginHandler : async () => {},
    logout : async () => {},
})

export default function AuthContextProvider({children}){

    const [hasMounted, setHasMounted] = useState(false);
    const [user, loading] = useAuthState(auth);
    const googleProvider = new GoogleAuthProvider(auth);

    useEffect(() => {
        setHasMounted(true);
    }, []);

    const googleLoginHandler = async () => {
        try {
            signInWithPopup(auth, googleProvider)
        } catch (error) {
            throw error;
        }
    };

    const logout = async () => {
        signOut(auth);
    };

    const values = {
        user, loading, googleLoginHandler, logout,
    }

    if (!hasMounted) {
        // Avoid rendering children until after initial client mount,
        // so server and first client markup stay in sync.
        return null;
    }

    return <authContext.Provider value={values}>
        {children}
    </authContext.Provider>
}
