import {GetServerSideProps, InferGetServerSidePropsType, NextPage} from "next"
import React, {useEffect} from "react";
import {
    Box,
    Button,
    Flex,
    Heading,
    Stack,
    Table,
    Tbody,
    Td,
    Text,
    Th,
    Thead,
    Tr,
    useBreakpointValue,
    useColorModeValue
} from "@chakra-ui/react";
import {db} from "../../firebase/clientApp";
import {DocumentData, query} from "@firebase/firestore";
import {collection, deleteDoc, doc, getDocs, where} from "firebase/firestore";
import {useAuth} from "../../context/AuthUserContext";
import {useRouter} from "next/router";
import {showToaster} from "../../utils/toaster";
import {DeleteIcon, EditIcon, ViewIcon} from "@chakra-ui/icons";

const getJobs = async (uid: string | undefined) => {
    if (!uid) {
        return []
    }
    const jobs: DocumentData = []
    const jobsCollection = collection(db, 'jobs')
    const jobsQuery = query(jobsCollection, where('createdBy', "==", uid))
    const jobsSnapshot = await getDocs(jobsQuery)

    jobsSnapshot.forEach((snapshot) => {
        jobs.push(snapshot.data());
    });

    return jobs
}

const ProfilePage: NextPage = ({jobs}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
    const {authUser, loading} = useAuth();
    const router = useRouter()
    useEffect(() => {
        if (!authUser && !loading) {
            router.push('/')
        }
        if (authUser && authUser.uid) {
            router.push({
                pathname: `/user/profile`,
                query: {
                    profile: authUser.uid
                }
            })
        }
    }, [authUser, loading])

    const handleEditJob = (uid: string) => {
        router.push(`/job/edit/${uid}`)
    }
    const handleShowJob = (uid: string) => {
        router.push(`/job/${uid}`)
    }

    const handleDeleteJob = (uid: string) => {
        deleteDoc(doc(db, 'jobs', uid)).then(() => {
            showToaster({
                title: "Udało się!",
                description: "Ogłoszenie zostało usunięte",
                status: "success"
            })

            router.reload()
        })
    }

    const tableVariant = useBreakpointValue({base: 'sm', md: 'lg'})
    return (
        <Flex
            minH={'90vh'}
            align={'flex-start'}
            justify={'center'}
            bg={useColorModeValue('gray.50', 'gray.800')}>
            <Stack
                w={'6xl'}
                p={8}
            >
                <Stack align={'center'} mb={8}>
                    <Heading fontSize={'3xl'} textAlign={'center'}>Twoje ogłoszenia</Heading>
                    <Text fontSize={'lg'} color={'gray.600'}>
                        poniżej znajduje się twoja lista ogłoszeń
                    </Text>
                </Stack>

                <Box
                    size={'8xl'}
                    rounded={'lg'}
                    bg={useColorModeValue('white', 'gray.700')}
                    boxShadow={'lg'}
                    p={{base: 2, sm: 8}}
                >
                    <div style={{'overflowX': 'scroll'}}>
                        <Table
                            variant='simple'
                            size={tableVariant}
                        >
                            <Thead>
                                <Tr>
                                    <Th>Nazwa ogłoszenie</Th>
                                    <Th>Wynagrodzenie</Th>
                                    <Th>Akcje</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {jobs.map((job: any) => (
                                    <Tr key={job.title}>
                                        <Td>{job.title}</Td>
                                        <Td>{job.salaryMin} - {job.salaryMax} PLN</Td>
                                        <Td>
                                            <Stack direction={{base: 'column', sm: 'row'}}>
                                                <Button
                                                    onClick={() => handleShowJob(job.uid)}>
                                                    <ViewIcon></ViewIcon>
                                                </Button>
                                                <Button
                                                    colorScheme={'green'}
                                                    onClick={() => handleEditJob(job.uid)}>
                                                    <EditIcon></EditIcon>
                                                </Button>
                                                <Button
                                                    colorScheme={'red'}
                                                    onClick={() => handleDeleteJob(job.uid)}>
                                                    <DeleteIcon></DeleteIcon>
                                                </Button>
                                            </Stack>
                                        </Td>
                                    </Tr>
                                ))}

                            </Tbody>
                        </Table>
                    </div>
                </Box>
            </Stack>
        </Flex>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const {query} = context
    const jobs = await getJobs(query?.profile as string)

    return {
        props: {
            jobs
        }
    }
}

export default ProfilePage
