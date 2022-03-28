import { format } from 'date-fns'
import { VStack, Text, Heading, HStack } from 'native-base'

import { SeasonSettingsAboutCard_SeasonFragment } from '@/generated'

import SeasonSettingsCard from './Card'

export interface SeasonSettingsAboutCardProps {
    season: SeasonSettingsAboutCard_SeasonFragment
}

const dateFormat = 'MMM d yyyy'

export default function SeasonSettingsAboutCard({
    season
}: SeasonSettingsAboutCardProps) {
    const { name, startDate, endDate } = season

    return (
        <SeasonSettingsCard p={4}>
            <VStack space={2}>
                <HStack alignItems="flex-start" justifyContent="space-between">
                    <Heading color="blueGray.600" size="md">
                        {name}
                    </Heading>
                </HStack>
                <VStack space={0.5}>
                    <Text color="blueGray.400">Duration</Text>
                    <Text color="blueGray.600">
                        {format(startDate, dateFormat)} -{' '}
                        {format(endDate, dateFormat)}
                    </Text>
                </VStack>
            </VStack>
        </SeasonSettingsCard>
    )
}