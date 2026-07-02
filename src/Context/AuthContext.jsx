import React, { createContext, useState, useContext, useEffect, Children } from "react";
import {
    getAuth,
    onAuthStateChanged,
    signOut,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword
} from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";

export const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth debe ser usado dentro de un AuthProvider");
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const auth = getAuth();
    const db = getFirestore();

    const signup = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password);
    };

    const login = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password);
    };

    const logout = () => {
        signOut(auth);
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currenUser) => {
            if (currenUser) {
                const userDocRef = doc(db, "usuarios", currenUser.uid);
                const userDocSnap = await getDoc(userDocRef);

                if (userDocSnap.exists() && userDocSnap.data().rol === 'admin') {
                    setUser({ uid: currenUser.uid, email: currenUser.email, rol: 'admin' });
                } else {
                    setUser(currenUser);
                }
            } else {
                setUser(null);
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, [auth, db]);

    const value = {
        user,
        loading,
        signup,
        login,
        logout,
    };
    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

