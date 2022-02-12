import {NextPage} from "next";
import {useFirebaseRegister} from "../../hooks/useUserManager";
import {useRouter} from "next/router";
import RegisterWizard from "../../components/RegisterForm/RegisterWizard";
import {RegisterWizardData} from "../../components/RegisterForm/interfaces";
import {showToaster} from "../../utils/toaster";

const RegisterPage: NextPage = () => {

    const router = useRouter()
    const {registerAndCreateProfile, error} = useFirebaseRegister()

    const registerUserAction = async (data: RegisterWizardData) => {
        registerAndCreateProfile(data)
            .then((error: any) => {
                if (error) {
                    showToaster({
                        title: "Błąd",
                        description: "Wystąpił błąd podczas zakładania konta",
                        status: "error"
                    })
                } else {
                    showToaster({
                        title: "Witamy",
                        description: "Proces rejestracji nowego konta przebiegł pomyślnie",
                        status: "success"
                    })
                    router.push("/user/login")
                }

            })
        console.log(error)
    }

    const action = (data: RegisterWizardData) => {
        console.log(data)
    }
    return (<RegisterWizard action={registerUserAction}/>)
}

export default RegisterPage;