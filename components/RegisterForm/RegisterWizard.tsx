import {Box, Flex, Heading, Stack, StackDivider, Text, useColorModeValue} from "@chakra-ui/react";
import {Step, Steps, useSteps} from 'chakra-ui-steps';
import {useForm} from "react-hook-form";
import {RegisterWizardData, RegisterWizardParams} from "./interfaces";
import {steps} from "./wizardSteps";
import RegisterWizardFooter from "./RegisterWizardFooter";

const RegisterWizard = ({action}: RegisterWizardParams) => {
    const {register, handleSubmit} = useForm<RegisterWizardData>();

    const {nextStep, prevStep, activeStep} = useSteps({
        initialStep: 0,
    });

    return (
        <form onSubmit={handleSubmit(action)}>
            <Flex
                minH={'90vh'}
                align={'center'}
                justify={'center'}
                bg={useColorModeValue('gray.50', 'gray.800')}>
                <Stack
                    spacing={8}
                    mx={'auto'}
                    w={'2xl'}
                    py={12}
                    px={6}
                    mt={'-10%'}>
                    <Stack align={'center'}>
                        <Heading fontSize={'3xl'} textAlign={'center'}>
                            Załóż konto pracodawcy
                        </Heading>
                        <Text fontSize={'lg'} color={'gray.600'} textAlign={'center'}>
                            dzieli Cię tylko kilka kroków od dodania ogłoszenia
                        </Text>
                    </Stack>
                    <Box
                        rounded={'lg'}
                        bg={useColorModeValue('white', 'gray.700')}
                        boxShadow={'lg'}
                        p={8}>
                        <Stack
                            spacing={4}
                            divider={
                                <StackDivider
                                    borderColor={useColorModeValue('gray.100', 'gray.700')}
                                />
                            }>
                            <Steps activeStep={activeStep}>
                                {steps.map(({step, label, content}) => (
                                    <Step key={step}>
                                        <Stack align={'center'}>
                                            <Text fontSize={'lg'} color={'gray.600'} py={4}>{label}</Text>
                                        </Stack>
                                        <Stack spacing={4}>
                                            {content({register})}
                                        </Stack>
                                    </Step>
                                ))}
                            </Steps>
                        </Stack>
                        <RegisterWizardFooter
                            currentStep={activeStep}
                            stepsTotal={steps.length}
                            nextStep={nextStep}
                            prevStep={prevStep}
                        />
                    </Box>
                </Stack>
            </Flex>
        </form>
    )
}

export default RegisterWizard