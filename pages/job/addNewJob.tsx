import {
    Box,
    Button,
    Flex,
    FormControl,
    FormLabel,
    Heading,
    Input,
    Select as ChakraSelect,
    Stack,
    Text,
    useColorModeValue
} from "@chakra-ui/react";
import {collection, doc, getDoc, setDoc} from "firebase/firestore";
import {useForm} from "react-hook-form";
import {useUserManager} from "../../hooks/useUserManager";
import {db} from "../../firebase/clientApp";
import {showToaster} from "../../utils/toaster";
import {MultiValue, Select} from "chakra-react-select";
import {useRouter} from "next/router";
import RichTextEditor from "../../components/RichTextEditor/RIchTextEditor";
import {experienceLevels} from "../../data/experienceLevels";
import {jobCategories, technologies} from "../../data/categories";


export interface JobFormData {
    title: string
    tags: string[]
    content: string
    category: string,
    experienceLevel: string
    salaryMin: number
    salaryMax: number
}

const getUserProfileDetails = async (uid: string) => {
    const usersProfileRef = doc(db, 'users', uid)
    const userProfileDoc = await getDoc(usersProfileRef)
    return userProfileDoc.data()
}

const AddNewJobPage = () => {
    const router = useRouter()
    const {currentUser} = useUserManager();
    const {register, handleSubmit, reset, setValue} = useForm<JobFormData>();

    const handleTagsChange = (data: MultiValue<{ label: string; value: string; }>) => {
        const tags = data.map(tag => {
            return tag.value
        })
        setValue("tags", tags)
    };

    const handleContentChange = (data: string) => {
        setValue("content", data)
    }

    const addNewJob = async (data: JobFormData) => {
        if (!currentUser) return

        const uid = currentUser.uid
        const currentUserProfile = await getUserProfileDetails(uid)

        const docRef = doc(collection(db, 'jobs'))

        const newJob = {
            ...data,
            logo: currentUserProfile?.logo,
            companyName: currentUserProfile?.company,
            createdBy: uid,
            location: currentUserProfile?.location,
            createdAt: Date.now(),
            uid: docRef.id
        }

        return setDoc(docRef, newJob)
            .then(status => {
                showToaster({
                    title: "Udało się!",
                    description: "Ogłoszenie zostało dodane",
                    status: "success"
                })
                reset()
                router.push(`/job/${docRef.id}`)
            }).catch(err => {
                showToaster({
                    title: "Przepraszamy",
                    description: "Nie udało się dodać ogłoszenia, wystąpił nieoczekiwany błąd",
                    status: "error"
                })
            })
    }

    return (
        <form onSubmit={handleSubmit(addNewJob)}>
            <Flex
                minH={'90vh'}
                align={'center'}
                justify={'center'}
                bg={useColorModeValue('gray.50', 'gray.800')}>
                <Stack
                    w={'5xl'}
                    p={{base: 2, sm: 8}}
                >
                    <Stack align={'center'} mb={8}>
                        <Heading
                            fontSize={{base: '2xl', sm: "3xl"}}
                            textAlign={'center'}>
                            Dodaj nowe ogłoszenie o pracę
                        </Heading>
                        <Text
                            fontSize={{base: 'md', sm: "lg"}}
                            color={'gray.600'}>
                            podziel się szczegółami swojej oferty
                        </Text>
                    </Stack>
                    <Box

                        size={'8xl'}
                        rounded={'lg'}
                        bg={useColorModeValue('white', 'gray.700')}
                        boxShadow={'lg'}
                        p={{base: 4, sm: 8}}>
                        <Stack spacing={4}>
                            <FormControl id="email">
                                <FormLabel>Tytuł ogłoszenia</FormLabel>
                                <Input type="text" {...register('title')}/>
                            </FormControl>
                            <FormControl id="content">
                                <FormLabel>Treść ogłoszenia</FormLabel>
                                <RichTextEditor onChange={handleContentChange}/>
                            </FormControl>
                            <FormControl id="tags">
                                <FormLabel>Wybierz techologie</FormLabel>
                                <Select
                                    isMulti
                                    name={'tags'}
                                    options={technologies()}
                                    placeholder="Zacznij wpisywać lub rozwiń opcje...."
                                    closeMenuOnSelect={false}
                                    onChange={handleTagsChange}
                                />
                            </FormControl>
                            <FormControl id="category">
                                <FormLabel>Kategoria</FormLabel>
                                <ChakraSelect {...register('category')}>
                                    {jobCategories.map(item => (
                                        <option key={item.value} value={item.value}>{item.value}</option>
                                    ))}
                                </ChakraSelect>
                            </FormControl>
                            <FormControl id="level">
                                <FormLabel>Wymagane doświadczenie</FormLabel>
                                <ChakraSelect {...register('experienceLevel')}>
                                    {experienceLevels.map(item => (
                                        <option key={item.value} value={item.value}>{item.label}</option>
                                    ))}
                                </ChakraSelect>
                            </FormControl>
                            <Stack direction={'row'}>
                                <FormControl id="salaryMin">
                                    <FormLabel>Minimalne widełki</FormLabel>
                                    <Input type="number" {...register('salaryMin')}/>
                                </FormControl>
                                <FormControl id="salaryMax">
                                    <FormLabel>Maksymalne widełki</FormLabel>
                                    <Input type="number" {...register('salaryMax')}/>
                                </FormControl>
                            </Stack>
                            <Stack spacing={10}>

                                <Button
                                    type={'submit'}
                                    bg={'blue.400'}
                                    color={'white'}
                                    _hover={{
                                        bg: 'blue.500',
                                    }}
                                >
                                    Dodaj nowe ogłoszenie
                                </Button>
                            </Stack>
                        </Stack>
                    </Box>
                </Stack>
            </Flex>
        </form>
    );
}

export default AddNewJobPage