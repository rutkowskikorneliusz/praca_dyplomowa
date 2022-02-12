import JobOfferListItem, {JobOfferListItemData} from "./JobOfferListItem/JobOfferListItem";
import {Link, Stack} from '@chakra-ui/react'

interface JobOfferListProps {
    jobs: JobOfferListItemData[]
}

const JobOfferList = (data: JobOfferListProps) => {
    return (
        <Stack
            spacing={8}
            mt={8}
        >
            {data.jobs.map(job => (
                <Link key={job.title} href={`/job/${job.uid}`}>
                    <JobOfferListItem {...job} />
                </Link>
            ))}
        </Stack>
    )
}

export default JobOfferList