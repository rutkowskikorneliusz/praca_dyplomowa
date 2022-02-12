import {SearchIcon} from "@chakra-ui/icons"
import {FormControl, Input, InputGroup, InputLeftElement, Stack, useBreakpointValue} from "@chakra-ui/react"
import React from "react"
import {MultiValue, Select, Size} from "chakra-react-select";
import _ from 'lodash';
import {experienceLevels} from "../../data/experienceLevels";
import {technologies} from "../../data/categories";

interface JobsFilterProps {
    onSearchQueryStringChanged: any
    onTagsFilterChanged: any
    onExperienceLevelFilterChanged: any
}

interface SelectedItem extends MultiValue<{ label: string; value: string; }> {
}

export const JobsFilter = (props: JobsFilterProps) => {

    const handleTagsChange = (data: SelectedItem) => {
        const tags = data.map(tag => {
            return tag.value
        })
        props.onTagsFilterChanged(tags)
    };
    const handleExperienceLevelChange = (data: SelectedItem) => {
        const values = data.map(item => {
            return item.value
        })
        props.onExperienceLevelFilterChanged(values)
    };

    const debouncedHandler = _.debounce(props.onSearchQueryStringChanged, 500)
    const inputSize = useBreakpointValue({base: 'md', sm: 'lg'})

    return (
        <Stack direction={{base: 'column', sm: 'row'}}>
            <FormControl id="search">
                <InputGroup>
                    <InputLeftElement
                        pointerEvents='none'
                        children={<SearchIcon color='gray.300'/>}
                    />
                    <Input
                        type='text'
                        placeholder='Nazwa ogłoszenia'
                        size={inputSize as Size}
                        onChange={(e) => debouncedHandler(e.target.value)}/>
                </InputGroup>
            </FormControl>
            <FormControl id="tags">
                <Select
                    isMulti
                    name={'tags'}
                    options={technologies()}
                    placeholder="Technologie ktore Cie interesuja"
                    closeMenuOnSelect={false}
                    onChange={handleTagsChange}
                    size={inputSize as Size}

                />
            </FormControl>
            <FormControl id="experienceLevel">
                <Select
                    isMulti
                    name={'tags'}
                    options={experienceLevels}
                    placeholder="Doswiadczenie"
                    closeMenuOnSelect={false}
                    onChange={handleExperienceLevelChange}
                    size={inputSize as Size}
                />
            </FormControl>
        </Stack>
    )
}