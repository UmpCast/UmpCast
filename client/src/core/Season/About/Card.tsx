import { format } from 'date-fns'
import { Heading, VStack, Text, HStack } from 'native-base'

import { SeasonAboutCard_SeasonFragment } from '@/generated'

import SeasonAboutCardBox from './CardBox'

export interface SeasonAboutCardProps {
    season: SeasonAboutCard_SeasonFragment
}

export default function SeasonAboutCard({ season }: SeasonAboutCardProps) {
    const { name, startDate, endDate } = season

    return (
        <SeasonAboutCardBox p={4}>
            <VStack space={2}>
                <HStack alignItems="flex-start" justifyContent="space-between">
                    <Heading color="blueGray.600" size="md">
                        {name}
                    </Heading>
                </HStack>
                <VStack>
                    <Text color="blueGray.400">Active from</Text>
                    <Text color="blueGray.600">
                        {format(startDate, 'MMM d')} -{' '}
                        {format(endDate, 'MMM d')}
                    </Text>
                </VStack>
            </VStack>
        </SeasonAboutCardBox>
    )
}
