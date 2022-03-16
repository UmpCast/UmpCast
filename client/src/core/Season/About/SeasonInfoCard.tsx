import { format } from 'date-fns'
import { Heading, VStack, Text, HStack } from 'native-base'

import { SeasonInfoCard_SeasonFragment } from '@/generated'

import SeasonInfoCardBox from './SeasonInfoCardBox'

export interface SeasonInfoCardProps {
    season: SeasonInfoCard_SeasonFragment
}

export default function SeasonInfoCard({ season }: SeasonInfoCardProps) {
    const { name, startDate, endDate } = season

    return (
        <SeasonInfoCardBox p={4}>
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
        </SeasonInfoCardBox>
    )
}
