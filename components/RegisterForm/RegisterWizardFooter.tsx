import {Button, Flex} from "@chakra-ui/react"

interface RegisterWizardFooterParams {
    currentStep: number,
    stepsTotal: number,
    prevStep: () => void,
    nextStep: () => void,
}

const RegisterWizardFooter = ({currentStep, stepsTotal, prevStep, nextStep}: RegisterWizardFooterParams) => {

    if (currentStep === 3) {
        return (
            <Flex justify={'center'} pt={8}>

                <Button
                    type={'submit'}
                    bg={'blue.400'}
                    color={'white'}
                    _hover={{
                        bg: 'blue.500',
                    }}
                >
                    Załóż konto
                </Button>

            </Flex>
        )
    }

    return (
        <Flex justify={currentStep > 0 ? 'space-between' : 'flex-end'} pt={8}>
            {currentStep > 0 &&
            <Button variant={'link'} onClick={prevStep}>
                Cofnij
            </Button>
            }

            <Button
                type={'button'}
                bg={'blue.400'}
                color={'white'}
                _hover={{
                    bg: 'blue.500',
                }}
                onClick={nextStep}
            >
                Dalej
            </Button>

        </Flex>
    )
}

export default RegisterWizardFooter