'use client'
import React from 'react';
import {
    onAuthStateChanged,
    getAuth,
} from 'firebase/auth';

import firebase_app from '@/firebase/config';

const auth = getAuth(firebase_app);

export const AuthContext = React.createContext({
    user: {
        email: null,
        uid: null,
        metadata: {
            creationTime: null
        },
    },
    setUser: (user: any) => user || null
});

export const useAuthContext = () => React.useContext(AuthContext);

export const AuthContextProvider = ({
    children,
}: { children: React.ReactNode}) => {
    const [user, setUser] = React.useState<any>(null);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
            } else {
                setUser(null);
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    return (
        <AuthContext.Provider value={{ user, setUser }}>
            {loading ? <div>Loading...</div> : children}
        </AuthContext.Provider>
    );
};