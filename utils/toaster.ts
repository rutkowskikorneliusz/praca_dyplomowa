import {createStandaloneToast} from "@chakra-ui/react";

interface ToasterParams {
    title: string
    description: string
    status: "success" | "error" | "info" | "warning"
}

export const showToaster = ({title, description, status}: ToasterParams) => {
    const toast = createStandaloneToast()

    return toast({
        title,
        description,
        status,
        duration: 2000,
        isClosable: true,
        position: "top"
    })
}