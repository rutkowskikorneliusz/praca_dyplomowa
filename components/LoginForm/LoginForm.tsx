import {
    Box,
    Button,
    Checkbox,
    Flex,
    FormControl,
    FormLabel,
    Heading,
    Input,
    Link,
    Stack,
    Text,
    useColorModeValue
} from "@chakra-ui/react";
import {useForm} from "react-hook-form";

interface LoginFormParams {
    action: (data: LoginFormData) => void
}

export interface LoginFormData {
    email: string
    password: string
    remeber: boolean
}

const LoginForm = ({action}: LoginFormParams) => {

    const {register, handleSubmit} = useForm<LoginFormData>();

    return (
        <form onSubmit={handleSubmit(action)}>
            <Flex
                minH={'95vh'}
                align={'center'}
                justify={'center'}
                bg={useColorModeValue('gray.50', 'gray.800')}
            >
                <Stack spacing={8} mx={'auto'} w={'2xl'} py={12} px={6} mt={'-10%'}>
                    <Stack align={'center'}>
                        <Heading fontSize={'3xl'} textAlign={'center'}>Zaloguj się na konto pracodawcy</Heading>
                        <Text fontSize={'lg'} color={'gray.600'}>
                            aby dodać nowe <Link color={'blue.400'}>ogłoszenia</Link> ✌️
                        </Text>
                    </Stack>
                    <Box
                        rounded={'lg'}
                        bg={useColorModeValue('white', 'gray.700')}
                        boxShadow={'lg'}
                        p={8}>

                        <Stack spacing={4}>
                            <FormControl id="email">
                                <FormLabel>Adres e-mail</FormLabel>
                                <Input type="email" {...register('email')}/>
                            </FormControl>
                            <FormControl id="password">
                                <FormLabel>Hasło</FormLabel>
                                <Input type="password" {...register('password')}/>
                            </FormControl>
                            <Stack spacing={10}>
                                <Stack
                                    direction={{base: 'column', sm: 'row'}}
                                    align={'start'}
                                    justify={'space-between'}>
                                    <Checkbox {...register('remeber')}>Zapamiętaj mnie</Checkbox>
                                    <Link color={'blue.400'}>Zapomniałeś hasło?</Link>
                                </Stack>
                                <Button
                                    type={'submit'}
                                    bg={'blue.400'}
                                    color={'white'}
                                    _hover={{
                                        bg: 'blue.500',
                                    }}
                                >
                                    Zaloguj
                                </Button>
                            </Stack>
                        </Stack>
                    </Box>
                </Stack>
            </Flex>
        </form>
    );
}

export default LoginForm