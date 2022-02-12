import {doc, getDoc} from "firebase/firestore";
import {GetServerSideProps, InferGetServerSidePropsType, NextPage} from "next"
import {db} from "../../firebase/clientApp";
import {Avatar, Box, Center, Divider, Flex, Heading, Stack, Tag, Text, useColorModeValue} from '@chakra-ui/react'
import Image from 'next/image';
import TagsList from "../../components/JobOfferList/JobOfferListItem/TagsList/TagsList";
import parse from 'html-react-parser'

const moment = require('moment');
const getUserProfileDetails = async (uid: string) => {
    const usersProfileRef = doc(db, 'users', uid)
    const userProfileDoc = await getDoc(usersProfileRef)
    const data = userProfileDoc.data()
    return {
        email: data?.email,
        company: data?.company,
        location: data?.location,
        description: data?.description,
        baner: data?.baner,
        logo: data?.logo
    }
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
        createdAt: data?.createdAt
    }
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const {params} = context

    const jobData = await getJobDetails(params?.uid as string)
    const userProfile = await getUserProfileDetails(jobData.createdBy)
    return {
        props: {
            jobData,
            userProfile
        }
    }
}

const JobPage: NextPage = ({jobData, userProfile}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
    moment.locale('pl');

    const createdAt = moment(jobData.createdAt)
    return (
        <Center py={6}>
            <Box
                w={'6xl'}
                bg={useColorModeValue('white', 'gray.900')}
                boxShadow={'2xl'}
                rounded={'md'}
                p={6}
                overflow={'hidden'}
            >
                <Box
                    h={'300px'}
                    bg={'gray.100'}
                    mt={-6}
                    mx={-6}
                    mb={6}
                    pos={'relative'}>
                    <Image
                        src={userProfile.baner}
                        layout={'fill'}
                        alt={'image'}
                    />
                    <Avatar
                        size="xl"
                        pos={'absolute'}
                        left={'50%'}
                        right={'50%'}
                        bottom={'-25px'}
                        transform={'translateX(-50%)'}
                        src={userProfile.logo}
                        alt={userProfile.company}
                    />
                </Box>
                <Flex
                    display={'flex'}
                    alignItems={'flex-start'}
                    justifyContent={'space-between'}
                    flexDirection={{base: 'column', sm: 'row'}}
                >
                    <Stack direction={{base: 'column-reverse', sm: 'column'}}>
                        <Heading
                            color={useColorModeValue('gray.700', 'white')}
                            fontSize={'3xl'}
                            fontFamily={'body'}
                            pt={{base: '1', sm: '3'}}
                        >
                            {jobData.title}
                            <Tag
                                size={'md'}
                                borderRadius="full"
                                variant="solid"
                                colorScheme="purple"
                                ml={2}
                                mt={2}
                            >
                                {jobData.experienceLevel}
                            </Tag>
                        </Heading>
                        <Stack
                            direction={'row'}
                        >
                            <Text
                                color={'gray.500'}
                                fontSize={'md'}
                                fontWeight={'bold'}
                                pt={'1'}>
                                {userProfile.company},
                            </Text>
                            <Text
                                color={'gray.500'}
                                fontSize={'md'}
                                pt={'1'}>
                                {userProfile.location}
                            </Text>
                        </Stack>
                    </Stack>
                    <Stack
                        display={'flex'}
                        alignItems={{base: 'center', sm: 'flex-end'}}
                        justifyContent={{base: 'center', sm: 'space-between'}}
                        direction={{base: 'column', sm: 'column'}}
                        w={{base: 'full', sm: 'max'}}
                        mt={'3'}
                    >
                        <Tag
                            borderRadius="full"
                            size={'md'}
                            variant={'outline'}
                            p={3}
                            mb={4}
                        >
                            <Heading size={'md'}>
                                {jobData.salaryMin} - {jobData.salaryMax} PLN
                            </Heading>
                        </Tag>
                        <TagsList tags={jobData.tags} size={'md'} my={8}/>
                    </Stack>
                </Flex>
                <Divider my={8}/>
                <Text
                    p={'4'}
                    color={'gray.500'}
                >
                    {parse(jobData.content)}
                </Text>

                <Divider my={8}/>
                <Stack
                    direction={'row'}
                    alignItems={'center'}
                    justifyContent={'space-between'}
                >
                    <Text size={'sm'}><strong>Kategoria:</strong> {jobData.category}</Text>
                    <Text
                        size={'sm'}><strong>Dodano:</strong> {createdAt.startOf('day').fromNow()}
                    </Text>
                </Stack>
            </Box>
        </Center>
    );
}
export default JobPage