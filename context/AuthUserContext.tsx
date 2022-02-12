// @ts-nocheck
import {createContext, useContext} from 'react'
import {AuthUser, useFirebaseAuth} from "../hooks/useFirebaseAuth";

const authUserContext = createContext({
    authUser: {} as AuthUser,
    loading: true
});

export function AuthUserProvider({children}: any) {
    const auth = useFirebaseAuth();

    return <authUserContext.Provider value={auth}>{children}</authUserContext.Provider>;
}

export const useAuth = () => useContext(authUserContext);

