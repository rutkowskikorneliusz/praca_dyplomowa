import {createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut} from "firebase/auth";
import {doc, setDoc} from "firebase/firestore";

import {useRouter} from "next/router";
import {auth, db, storage} from "../firebase/clientApp"
import {RegisterWizardData, UserProfile} from "../components/RegisterForm/interfaces";
import {getDownloadURL, ref, uploadBytes} from "firebase/storage";
import {useState} from "react";

export interface LoginDetails {
    email: string
    password: string
}

export const useUserManager = () => {
    const router = useRouter()
    const logInUser = ({email, password}: LoginDetails) => signInWithEmailAndPassword(auth, email, password);
    const registerUser = ({email, password}: LoginDetails) => createUserWithEmailAndPassword(auth, email, password);
    const logOutUserWithRedirect = (location: string) => {
        signOut(auth)
        router.push(location)
    }
    const currentUser = auth.currentUser

    return {currentUser, logInUser, registerUser, logOutUserWithRedirect, auth}
}

export const useFirebaseRegister = () => {
    const [error, setError] = useState(undefined)

    const uploadFileToStorage = async (fileRef: string, file: Blob) => {
        const storageRef = ref(storage, fileRef)
        const snapshot = await uploadBytes(storageRef, file)
        return getDownloadURL(snapshot.ref)
    }
    const registerAndCreateProfile = (data: RegisterWizardData) => {
        return createUserWithEmailAndPassword(auth, data.email, data.password)
            .then(async user => {
                const uid = user.user.uid
                const logo = data.logo[0]
                const baner = data.baner[0]
                const logoUrl = await uploadFileToStorage(`${uid}/${logo.name}`, logo as Blob)
                const banerUrl = await uploadFileToStorage(`${uid}/${baner.name}`, baner as Blob)

                const docRef = doc(db, 'users', uid)
                const userProfile: UserProfile = {
                    email: data.email,
                    company: data.company,
                    location: data.location,
                    description: data.description,
                    logo: logoUrl,
                    baner: banerUrl
                }

                return await setDoc(docRef, userProfile)
            }).catch(error => setError(error))
    }

    return {registerAndCreateProfile, error}
}