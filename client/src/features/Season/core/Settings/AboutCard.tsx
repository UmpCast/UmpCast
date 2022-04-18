import { format } from 'date-fns'
import { VStack, Text, Heading, HStack } from 'native-base'

import SettingsCard from '@/components/Settings/Card'
import { SeasonSettingsAboutCard_SeasonFragment } from '@/generated'

export interface SeasonSettingsAboutCardProps {
    season: SeasonSettingsAboutCard_SeasonFragment
}

const dateFormat = 'MMM d yyyy'

export default function SeasonSettingsAboutCard({
    season
}: SeasonSettingsAboutCardProps) {
    const { name, endDate } = season

    return (
        <SettingsCard p={4}>
            <VStack space={2}>
                <HStack alignItems="flex-start" justifyContent="space-between">
                    <Heading color="blueGray.600" size="md">
                        {name}
                    </Heading>
                </HStack>
                <VStack space={0.5}>
                    <Text color="blueGray.400">Ends on</Text>
                    <Text color="blueGray.600">
                        {format(new Date(endDate), dateFormat)}
                    </Text>
                </VStack>
            </VStack>
        </SettingsCard>
    )
}
