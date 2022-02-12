import {doc, getDoc} from "firebase/firestore";
import {GetServerSideProps, InferGetServerSidePropsType, NextPage} from "next"
import {db} from "../../firebase/clientApp";
import {UserProfile} from "../../components/RegisterForm/interfaces";
import {Avatar, Box, Center, Divider, Flex, Heading, Text, useColorModeValue} from '@chakra-ui/react'
import Image from 'next/image';
import JobOfferList from "../../components/JobOfferList/JobOfferList";

export const getServerSideProps: GetServerSideProps = async (context) => {
    const {params} = context
    const usersProfileRef = doc(db, 'users', params.uid)
    const userProfileDoc = await getDoc(usersProfileRef)
    const data = userProfileDoc.data()
    const userProfile: UserProfile = {
        email: data?.email,
        company: data?.company,
        location: data?.location,
        description: data?.description,
        baner: data?.baner,
        logo: data?.logo
    }

    return {
        props: {
            userProfile
        }
    }
}

const CurrentCompanyPage: NextPage = ({userProfile}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
    return (
        <Center py={6}>
            <Box
                w={'80%'}
                bg={useColorModeValue('white', 'gray.900')}
                boxShadow={'2xl'}
                rounded={'md'}
                p={6}
                overflow={'hidden'}
            >
                <Box
                    h={'420px'}
                    bg={'gray.100'}
                    mt={-6}
                    mx={-6}
                    mb={6}
                    pos={'relative'}>
                    <Image
                        src={userProfile.baner}
                        layout={'fill'}
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
                    alignItems={'center'}
                    justifyContent={'space-between'}
                    flexDirection={'column'}
                >
                    <Heading
                        color={useColorModeValue('gray.700', 'white')}
                        fontSize={'3xl'}
                        fontFamily={'body'}
                        pt={'3'}
                    >
                        {userProfile.company}
                    </Heading>
                    <Text
                        color={'gray.500'}
                        fontSize={'sm'}
                        pt={'1'}>
                        {userProfile.location}
                    </Text>
                    <Text
                        pt={'2'}
                        color={'gray.500'}
                        textAlign={'center'} w={'90%'}>
                        {userProfile.description}
                    </Text>
                </Flex>
                <Divider py={3}/>
                <JobOfferList logo={userProfile.logo}/>
            </Box>
        </Center>
    );
}
export default CurrentCompanyPage