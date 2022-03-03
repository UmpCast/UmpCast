import { SeasonInfoItem_SeasonFragment } from '@/generated'
import { Pressable, HStack, Text } from 'native-base'
import { format } from 'date-fns'

export interface SeasonInfoItemProp {
    season: SeasonInfoItem_SeasonFragment
}

export default function SeasonInfoItem({ season }: SeasonInfoItemProp) {
    const { name, startDate, endDate } = season

    const startDay = format(startDate, 'MMM d')
    const endDay = format(endDate, 'MMM d')

    const dateRange = `${startDay} - ${endDay}`

    return (
        <Pressable
            borderColor="blueGray.600"
            borderRadius={5}
            borderWidth={1}
            px={4}
            py={2}
            _hover={{
                backgroundColor: 'blueGray.100'
            }}
        >
            <HStack justifyContent="space-between" width="100%">
                <Text fontSize="md">{name}</Text>
                <Text color="blueGray.400">{dateRange}</Text>
            </HStack>
        </Pressable>
    )
}
