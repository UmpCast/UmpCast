import { HStack, Text } from 'native-base'

import MaterialIcon from '@/nx/components/MaterialIcon'

import { GameCalendarItemFragment } from './Item.generated'

interface StatusProps {
    game: GameCalendarItemFragment
}

export default function AssignmentStatus({ game }: StatusProps) {
    const unassignedCount = game.listings.filter((listing) => listing.assignee === null).length

    const totalCount = game.listings.length

    if (unassignedCount === 0) {
        return (
            <HStack alignItems="center" space={1}>
                <Text color="secondary.mute" fontSize="sm">
                    Closed
                </Text>
                <MaterialIcon color="secondary.mute" name="lock" size="sm" />
            </HStack>
        )
    }

    return (
        <HStack alignItems="center" space={1}>
            <Text color="primary.solid" fontSize="sm">
                {unassignedCount} / {totalCount} Left
            </Text>
            <MaterialIcon color="primary.solid" name="lock-open" size="sm" />
        </HStack>
    )
}
