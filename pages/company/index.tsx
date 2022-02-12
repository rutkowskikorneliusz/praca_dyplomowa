import {collection, getDocs} from "firebase/firestore";
import {GetServerSideProps, InferGetServerSidePropsType, NextPage} from "next"
import Link from "next/link"
import {db} from "../../firebase/clientApp";
import {UserProfile} from "../../components/RegisterForm/interfaces";
import ComapnyProfileCard from "../../components/CompanyProfileCard/CompanyProfileCard";
import {Box, SimpleGrid} from '@chakra-ui/react'

export const getServerSideProps: GetServerSideProps = async () => {
    const usersProfile: UserProfile[] = []

    const usersProfileRef = collection(db, 'users')
    const userProfileDocs = await getDocs(usersProfileRef)

    userProfileDocs.forEach(userProfile => {
        const data = userProfile.data()

        const profile: UserProfile = {
            uid: userProfile.id,
            email: data.email,
            company: data.company,
            location: data.location,
            description: data.description,
            baner: data.baner,
            logo: data.logo
        }

        usersProfile.push(profile)
    })
    return {
        props: {
            usersProfile
        }
    }
}

const CompanyPage: NextPage = ({usersProfile}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
    return (
        <Box p={4}>
            <SimpleGrid columns={{base: 1, md: 3}} spacing={10}>
                {usersProfile.map(user => (
                    <Link href={`/company/${user.uid}`}>
                        <a>
                            <ComapnyProfileCard
                                baner={user.baner}
                                logo={user.logo}
                                company={user.company}
                                location={user.location}
                                description={user.description}
                            />
                        </a>
                    </Link>

                ))}
            </SimpleGrid>
        </Box>
    )
}
export default CompanyPage