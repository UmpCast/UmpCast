import { format } from 'date-fns'
import { Pressable, HStack, Text } from 'native-base'

import { SeasonInfoItem_SeasonFragment } from '@/generated'

export interface SeasonInfoItemProp {
    season: SeasonInfoItem_SeasonFragment
    onPress: () => any
}

export default function SeasonInfoItem({
    season,
    onPress
}: SeasonInfoItemProp) {
    const { name, startDate, endDate } = season

    const startDay = format(startDate, 'MMM d')
    const endDay = format(endDate, 'MMM d')

    const dateRange = `${startDay} - ${endDay}`

    return (
        <Pressable
            _hover={{
                backgroundColor: 'blueGray.100'
            }}
            borderColor="blueGray.600"
            borderRadius={5}
            borderWidth={1}
            onPress={onPress}
            px={4}
            py={2}
        >
            <HStack justifyContent="space-between" width="100%">
                <Text fontSize="md">{name}</Text>
                <Text color="blueGray.400">{dateRange}</Text>
            </HStack>
        </Pressable>
    )
}
