import Image from 'next/image';
import {Avatar, Box, Center, Heading, Stack, Tag, TagLabel, Text, useColorModeValue} from '@chakra-ui/react';

interface CompanyProfileCardProps {
    baner: string
    logo: string
    company: string
    location: string
    description: string
}

const CompanyProfileCard = (data: CompanyProfileCardProps) => {
    return (
        <Center py={6}>
            <Box
                maxW={'445px'}
                w={'full'}
                bg={useColorModeValue('white', 'gray.900')}
                boxShadow={'2xl'}
                rounded={'md'}
                p={6}
                overflow={'hidden'}>
                <Box
                    h={'210px'}
                    bg={'gray.100'}
                    mt={-6}
                    mx={-6}
                    mb={6}
                    pos={'relative'}>
                    <Image
                        src={data.baner}
                        layout={'fill'}
                    />
                    <Avatar
                        size="lg"
                        pos={'absolute'}
                        left={'20px'}
                        bottom={'-25px'}
                        src={data.logo}
                        alt={'Author'}
                    />
                </Box>
                <Stack direction={'row'} align={'center'} py={'3'}>
                    <Heading
                        color={useColorModeValue('gray.700', 'white')}
                        fontSize={'2xl'}
                        fontFamily={'body'}>
                        {data.company}
                    </Heading>
                    <Text color={'gray.500'}>{data.location}</Text>
                </Stack>
                <Stack>
                    <Text color={'gray.500'}>
                        {data.description.substr(0, 100)}
                    </Text>
                </Stack>
                <Tag
                    mt={'3'}
                    size={'md'}
                    borderRadius="full"
                    variant="solid"
                    colorScheme="blue"
                >
                    <TagLabel>2 ofert pracy</TagLabel>
                </Tag>
            </Box>
        </Center>
    );
}

export default CompanyProfileCard