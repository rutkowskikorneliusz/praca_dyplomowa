import {WizardStepParams} from "../interfaces";
import {Button, Flex, FormControl} from "@chakra-ui/react";
import FileUpload from "../../FileUpload/FileUpload";
import {AttachmentIcon} from "@chakra-ui/icons"

const LogoUploadStep = ({register}: WizardStepParams) => {
    return (
        <Flex>
            <FormControl id="logo">
                <FileUpload
                    accept={'image/*'}
                    register={register('logo')}
                >
                    <Button leftIcon={<AttachmentIcon/>}>
                        Wybierz plik
                    </Button>
                </FileUpload>
            </FormControl>
        </Flex>
    )
}

export default LogoUploadStep