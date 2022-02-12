import {useEffect, useState} from 'react'
import {auth} from "../firebase/clientApp";

export interface AuthUser {
    uid: string
    email: string
}

const formatAuthUser = (user: AuthUser) => ({
    uid: user.uid,
    email: user.email
});

export const useFirebaseAuth = () => {
    const [authUser, setAuthUser] = useState<AuthUser>();
    const [loading, setLoading] = useState(true);

    const authStateChanged = async (authState: any) => {
        if (!authState) {
            setAuthUser(undefined)
            setLoading(false)
            return;
        }

        setLoading(true)
        const formattedUser = formatAuthUser(authState);
        setAuthUser(formattedUser);
        setLoading(false);
    };

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(authStateChanged);
        return () => unsubscribe();
    }, []);

    return {
        authUser,
        loading
    };
}