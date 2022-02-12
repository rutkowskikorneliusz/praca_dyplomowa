import {collection, DocumentData, getDocs, query, where} from 'firebase/firestore';
import type {GetServerSideProps, InferGetServerSidePropsType, NextPage} from 'next'
import React, {useEffect, useState} from 'react';
import {db} from "../firebase/clientApp";
import {Box, Flex, Heading, Stack, Text, useColorModeValue} from '@chakra-ui/react';
import {JobsFilter} from "../components/JobsFIlter/JobsFilter";
import {useRouter} from 'next/router';
import {ParsedUrlQuery} from 'querystring';
import JobOfferList from '../components/JobOfferList/JobOfferList';

const getArrayFromQueryParam = (params: string | string[]) => {
    if (typeof params === 'string') {
        return [params]
    }
    return params
}
const getJobs = async (filterParams: ParsedUrlQuery) => {
    const jobs: DocumentData = []
    const jobsCollection = collection(db, 'jobs')
    const queryConstrain = []

    if (filterParams.search) {
        queryConstrain.push(where('title', ">=", filterParams.search))
        queryConstrain.push(where('title', "<=", filterParams.search + '\uf8ff'))
    }

    if (filterParams.tags) {
        const params = getArrayFromQueryParam(filterParams.tags)
        queryConstrain.push(where('tags', "array-contains", params))
    }

    if (filterParams.experience) {
        const params = getArrayFromQueryParam(filterParams.experience)
        queryConstrain.push(where('experienceLevel', "in", params))
    }

    const jobsQuery = query(jobsCollection, ...queryConstrain)
    const jobsSnapshot = await getDocs(jobsQuery)

    jobsSnapshot.forEach((snapshot) => {
        jobs.push(snapshot.data());
    });

    return jobs
}


export const getServerSideProps: GetServerSideProps = async (context) => {

    const {query} = context
    const jobs = await getJobs(query)

    return {
        props: {
            jobs
        }
    }
}

const Home: NextPage = ({jobs}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
    const router = useRouter()
    const [searchQuery, setSearchQuery] = useState<string>("")
    const [tagFilter, setTagFilter] = useState<string[]>([])
    const [expierienceLevelFilter, setExpierienceLevelFilter] = useState<string[]>([])

    useEffect(() => {
        router.push({
            pathname: "/",
            query: {
                search: !searchQuery ? null : searchQuery,
                tags: tagFilter,
                experience: expierienceLevelFilter
            }
        })
    }, [searchQuery, tagFilter, expierienceLevelFilter])
    return (
        <Flex
            minH={'90vh'}
            align={'flex-start'}
            justify={'center'}
            bg={useColorModeValue('gray.50', 'gray.800')}>
            <Stack
                w={{base: 'full', sm: '6xl'}}
                p={{base: '4', sm: '8'}}
            >
                <Stack align={'center'} mb={8}>
                    <Heading fontSize={'3xl'} textAlign={{base: 'left', sm: 'center'}}>Przeglądaj najlepsze ofert
                        pracy!</Heading>
                    <Text fontSize={'lg'} color={'gray.600'}>
                        skorzystaj z filtrów poniżej, aby znaleźć oferty dostosowane do Twoich umiejetnosci
                    </Text>
                </Stack>
                <Box
                    size={'8xl'}
                    rounded={'lg'}
                    bg={useColorModeValue('white', 'gray.700')}
                    boxShadow={'lg'}
                    p={{base: '4', sm: '8'}}
                    m={2}>
                    <JobsFilter onSearchQueryStringChanged={setSearchQuery}
                                onExperienceLevelFilterChanged={setExpierienceLevelFilter}
                                onTagsFilterChanged={setTagFilter}/>
                </Box>
                <Box
                    size={'8xl'}
                    rounded={'lg'}
                    bg={useColorModeValue('white', 'gray.700')}
                    boxShadow={'lg'}
                    p={{base: '4', sm: '8'}}>
                    <JobOfferList jobs={jobs}/>
                </Box>
            </Stack>
        </Flex>
    )
}


export default Home
