import { HStack, Text } from 'native-base'

import MaterialIcon from '@/nx/components/MaterialIcon'

import { GameCalendarItemFragment } from './Item.generated'

interface StatusProps {
    game: GameCalendarItemFragment
}

export default function AssignmentStatus({ game }: StatusProps) {
    const unassignedCount = game.listings.filter((listing) => {
        listing.assignee === null
    }).length

    const totalCount = game.listings.length

    if (unassignedCount === 0) {
        return (
            <HStack alignItems="center" space={1}>
                <Text color="secondary.400" fontSize="sm">
                    Closed
                </Text>
                <MaterialIcon color="secondary.400" name="lock" size="sm" />
            </HStack>
        )
    }

    return (
        <HStack alignItems="center" space={1}>
            <Text color="primary.600" fontSize="sm">
                {unassignedCount} / {totalCount} Left
            </Text>
            <MaterialIcon color="primary.600" name="lock-open" size="sm" />
        </HStack>
    )
}
