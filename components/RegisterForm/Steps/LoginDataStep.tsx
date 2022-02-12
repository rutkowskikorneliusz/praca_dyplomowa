import {FormControl, FormLabel, Input} from "@chakra-ui/react";
import {WizardStepParams} from "../interfaces";


const LoginDataStep = ({register}: WizardStepParams) => {
    return (
        <>
            <FormControl id="email">
                <FormLabel>Adres e-mail</FormLabel>
                <Input type="email" {...register('email')}/>
            </FormControl>
            <FormControl id="password">
                <FormLabel>Hasło</FormLabel>
                <Input type="password" {...register('password')}/>
            </FormControl>
        </>
    )

}

export default LoginDataStep