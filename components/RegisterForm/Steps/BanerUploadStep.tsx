import {WizardStepParams} from "../interfaces";
import {Button, FormControl} from "@chakra-ui/react";
import FileUpload from "../../FileUpload/FileUpload";
import {AttachmentIcon} from "@chakra-ui/icons"

const BanerUploadStep = ({register}: WizardStepParams) => {
    return (

        <FormControl id="baner">
            <FileUpload
                accept={'image/*'}
                register={register('baner')}
            >
                <Button leftIcon={<AttachmentIcon/>}>
                    Wybierz plik
                </Button>
            </FileUpload>
        </FormControl>
    )
}

export default BanerUploadStep