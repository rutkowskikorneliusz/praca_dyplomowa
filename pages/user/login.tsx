import {NextPage} from "next";
import {useRouter} from "next/router"
import {useUserManager} from "../../hooks/useUserManager";
import LoginForm, {LoginFormData} from "../../components/LoginForm/LoginForm";
import {showToaster} from "../../utils/toaster";

const LoginPage: NextPage = () => {
    const router = useRouter()
    const {logInUser} = useUserManager()

    const loginUser = ({email, password, remeber}: LoginFormData) => {
        logInUser({email, password})
            .then(auth => {
                showToaster({
                    title: "Zalogowany",
                    description: "Proces logowania przebiegł pomyślnie",
                    status: "success"
                })
                router.push("/user/profile")
            })
            .catch(error => {
                showToaster({
                    title: "Błąd",
                    description: "Wystąpił błąd podczas logowania",
                    status: "error"
                })
            })
    }
    return (<LoginForm action={loginUser}/>)
}

export default LoginPage