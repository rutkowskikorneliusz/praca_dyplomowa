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
import React, {useEffect} from "react";
import {jobCategories, technologies} from "../../../data/categories";
import {experienceLevels} from "../../../data/experienceLevels";
import RichTextEditor from "../../../components/RichTextEditor/RIchTextEditor";
import {Select} from "chakra-react-select";
import {showToaster} from "../../../utils/toaster";
import {doc, getDoc, setDoc} from "firebase/firestore";
import {db} from "../../../firebase/clientApp";
import {useForm} from "react-hook-form";
import {useRouter} from "next/router";
import {GetServerSideProps, InferGetServerSidePropsType} from "next";
import {JobFormData} from "../addNewJob";

interface EditJobFormData extends JobFormData {
    uid: string
}

const getJobDetails = async (uid: string) => {
    const jobRef = doc(db, 'jobs', uid)
    const jobDoc = await getDoc(jobRef)
    const data = jobDoc.data()

    return {
        title: data?.title,
        tags: data?.tags,
        content: data?.content,
        category: data?.category,
        experienceLevel: data?.experienceLevel,
        salaryMin: data?.salaryMin,
        salaryMax: data?.salaryMax,
        createdBy: data?.createdBy,
        createdAt: data?.createdAt,
        uid: data?.uid
    }
}
const transformTagsForSelect = (tags: string[]) => {
    return tags.map(tag => (
        {
            label: tag,
            value: tag
        }
    ))
}
const EditJob = ({jobData}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
    const router = useRouter()
    const {register, handleSubmit, reset, setValue} = useForm<EditJobFormData>();

    const handleTagsChange = data => {
        const tags = data.map(tag => {
            return tag.value
        })
        setValue("tags", tags)
    };

    const handleContentChange = data => {
        setValue("content", data)
    }

    const editJob = async (data: EditJobFormData) => {
        const docRef = doc(db, 'jobs', data.uid)

        return setDoc(docRef, data, {merge: true})
            .then(status => {
                showToaster({
                    title: "Udało się!",
                    description: "Zmiany zostaly zapisane",
                    status: "success"
                })
                reset()
                router.push(`/job/${docRef.id}`)
            }).catch(err => {
                showToaster({
                    title: "Przepraszamy",
                    description: "Nie udało się zapisa zmian, wystąpił nieoczekiwany błąd",
                    status: "error"
                })
            })
    }

    useEffect(() => {
        setValue('title', jobData.title)
        setValue('tags', jobData.tags)
        setValue('content', jobData.content)
        setValue('category', jobData.category)
        setValue('experienceLevel', jobData.experienceLevel)
        setValue('salaryMin', jobData.salaryMin)
        setValue('salaryMax', jobData.salaryMax)
        setValue('uid', jobData.uid)

    }, [jobData])

    return (
        <form onSubmit={handleSubmit(editJob)}>
            <Flex
                minH={'90vh'}
                align={'center'}
                justify={'center'}
                bg={useColorModeValue('gray.50', 'gray.800')}>
                <Stack
                    w={'5xl'}
                    p={8}
                >
                    <Stack align={'center'} mb={8}>
                        <Heading fontSize={'3xl'} textAlign={'center'}>Dodaj nowe ogłoszenie o pracę</Heading>
                        <Text fontSize={'lg'} color={'gray.600'}>
                            podziel się szczegółami swojej oferty
                        </Text>
                    </Stack>
                    <Box

                        size={'8xl'}
                        rounded={'lg'}
                        bg={useColorModeValue('white', 'gray.700')}
                        boxShadow={'lg'}
                        p={8}>
                        <Stack spacing={4}>
                            <FormControl id="email">
                                <FormLabel>Tytuł ogłoszenia</FormLabel>
                                <Input type="text" {...register('title')}/>
                            </FormControl>
                            <FormControl id="content">
                                <FormLabel>Treść ogłoszenia</FormLabel>
                                <RichTextEditor defaultValue={jobData.content} onChange={handleContentChange}/>
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
                                    defaultValue={transformTagsForSelect(jobData.tags)}

                                />
                            </FormControl>
                            <FormControl id="category">
                                <FormLabel>Kategoria</FormLabel>
                                <ChakraSelect {...register('category')}>
                                    {jobCategories.map(item => (
                                        <option value={item.value}>{item.value}</option>
                                    ))}
                                </ChakraSelect>
                            </FormControl>
                            <FormControl id="level">
                                <FormLabel>Wymagane doświadczenie</FormLabel>
                                <ChakraSelect {...register('experienceLevel')}>
                                    {experienceLevels.map(item => (
                                        <option value={item.value}>{item.label}</option>
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
                            <Input type="hidden" {...register('uid')}/>
                            <Stack spacing={10}>
                                <Button
                                    type={'submit'}
                                    bg={'blue.400'}
                                    color={'white'}
                                    _hover={{
                                        bg: 'blue.500',
                                    }}
                                >
                                    Zapisz zmiany
                                </Button>
                            </Stack>
                        </Stack>
                    </Box>
                </Stack>
            </Flex>
        </form>
    );
}

export default EditJob

export const getServerSideProps: GetServerSideProps = async (context) => {
    const {params} = context
    if (!params?.uid) return

    const jobData = await getJobDetails(params.uid as string)
    return {
        props: {
            jobData
        }
    }
}
