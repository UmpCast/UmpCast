import { Heading, VStack, Text, HStack } from 'native-base'
import { format } from 'date-fns'
import { SeasonInfoCard_SeasonFragment } from '@/generated'
import SeasonAboutCard from '../About/Card'

export interface SeasonInfoCardProps {
    season: SeasonInfoCard_SeasonFragment
}

export default function SeasonInfoCard({ season }: SeasonInfoCardProps) {
    const { name, startDate, endDate } = season

    return (
        <SeasonAboutCard p={4}>
            <VStack space={2}>
                <HStack justifyContent="space-between" alignItems="flex-start">
                    <Heading size="md" color="blueGray.600">
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
        </SeasonAboutCard>
    )
}
