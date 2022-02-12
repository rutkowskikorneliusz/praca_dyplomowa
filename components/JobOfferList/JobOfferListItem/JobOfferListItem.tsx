import {Avatar, Box, Spacer, Stack, Text, useColorModeValue} from '@chakra-ui/react'
import TagsList from "./TagsList/TagsList";
import moment from 'moment'
import React from 'react';

export interface JobOfferListItemData {
    uid: string;
    logo: string
    companyName: string,
    title: string,
    location: string,
    tags: string[]
    salaryMin: string
    salaryMax: string
    createdAt: string
}

const JobOfferListItem = (data: JobOfferListItemData) => {

    return (
        <Box
            bg={useColorModeValue('white', 'gray.800')}
            boxShadow={'xl'}
            rounded={'md'}
            p={8}>
            <Stack
                spacing={{base: 4, sm: 8}}
                w={'100%'}
                direction={{base: 'column', sm: 'row'}}
                justify={'center'}>
                <Avatar
                    size="lg"
                    src={data.logo}
                    alt={'Author'}
                />

                <Stack
                    spacing={1}
                    align="stretch">
                    <Text
                        fontWeight={'bold'}
                        fontSize={{base: 'sm', sm: "md"}}>
                        {data.companyName}
                    </Text>
                    <Text
                        fontSize={{base: 'xl', sm: "2xl"}}
                        fontWeight="extrabold">
                        {data.title}
                    </Text>
                    <Text
                        fontSize={{base: 'xs', sm: "sm"}}
                    >{data.location}</Text>
                    <TagsList tags={data.tags}/>
                </Stack>
                <Spacer/>
                <Stack
                    spacing={{base: 4, sm: 20}}
                >
                    <Text
                        fontSize={{base: 'xl', sm: "2xl"}}
                        fontWeight="extrabold"
                        color="green.400">
                        {data.salaryMin} - {data.salaryMax} PLN
                    </Text>
                    <Text
                        fontSize={{base: 'xs', sm: "sm"}}
                    ><b>Ogłoszenie dodano:</b> {moment(data.createdAt).startOf('day').fromNow()}
                    </Text>
                </Stack>

            </Stack>
        </Box>
    )
}
export default JobOfferListItem
