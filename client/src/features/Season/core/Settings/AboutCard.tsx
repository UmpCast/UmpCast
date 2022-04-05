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
    const { name, endDate } = season

    return (
        <SeasonSettingsCard p={4}>
            <VStack space={2}>
                <HStack alignItems="flex-start" justifyContent="space-between">
                    <Heading color="blueGray.600" size="md">
                        {name}
                    </Heading>
                </HStack>
                <VStack space={0.5}>
                    <Text color="blueGray.400">Ends on</Text>
                    <Text color="blueGray.600">
                        {format(endDate, dateFormat)}
                    </Text>
                </VStack>
            </VStack>
        </SeasonSettingsCard>
    )
}
