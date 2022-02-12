import {FormControl, FormLabel, Input, Textarea} from "@chakra-ui/react";
import {WizardStepParams} from "../interfaces";

const DetailsDataStep = ({register}: WizardStepParams) => {
    return (
        <>
            <FormControl id="company">
                <FormLabel>Nazwa</FormLabel>
                <Input type="text" {...register('company')}/>
            </FormControl>
            <FormControl id="description">
                <FormLabel>Opis</FormLabel>
                <Textarea type="email" {...register('description')}/>
            </FormControl>
            <FormControl id="location">
                <FormLabel>Adres siedziby</FormLabel>
                <Input type="text" {...register('location')}/>
            </FormControl>
        </>
    )
}

export default DetailsDataStep