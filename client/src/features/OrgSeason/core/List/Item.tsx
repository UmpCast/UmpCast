import { format } from 'date-fns'
import { Pressable, HStack, Text } from 'native-base'

import { OrgSeasonListItem_SeasonFragment } from '@/graphql/generated'

export interface OrgSeasonListItemProp {
    season: OrgSeasonListItem_SeasonFragment
    onPress: () => any
}

export default function OrgSeasonListItem({
    season,
    onPress
}: OrgSeasonListItemProp) {
    const { name, endDate } = season

    const endDay = format(new Date(endDate), 'MMM d')

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
                <Text color="blueGray.400">{endDay}</Text>
            </HStack>
        </Pressable>
    )
}
