import {HStack, Tag} from '@chakra-ui/react'

interface TagsListProps {
    tags: string[]
    size?: 'max' | 'min' | 'full' | '3xs' | '2xs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '5xl' | '6xl' | '7xl' | '8xl'
    my?: 1 | 2 | 4 | 8
}

const TagsList = ({tags, size, my}: TagsListProps) => {
    return (
        <HStack spacing={2} mt={4} my={my}>
            {tags.map(item => (
                <Tag
                    key={item}
                    size={size ? size : 'md'}
                    borderRadius="full"
                    variant="solid"
                    colorScheme="blue"
                >
                    {item}
                </Tag>
            ))}
        </HStack>
    )
}

export default TagsList