import { format } from 'date-fns'
import { Avatar, HStack, Text, VStack } from 'native-base'
import { ReactNode } from 'react'

import Surface from '@/nx/components/Surface'

import { GameCalendarItemFragment } from './Item.generated'
import PressableX from '@/nx/components/PressableX'

interface Props {
    game: GameCalendarItemFragment
    status: ReactNode
    onPress: () => void
}

export default function Item({ game, status, onPress }: Props) {
    const gameDetails =
        format(game.startTime, 'h:mm aa') + (game.location ? ` at ${game.location}` : '')

    return (
        <PressableX flex={1} variant="secondary.subtle" size="md" rounded="sm" onPress={onPress}>
            <VStack space={1}>
                <HStack justifyContent="space-between">
                    <Text fontSize="sm" fontWeight="semibold" isTruncated>
                        {game.name}
                    </Text>
                    {status}
                </HStack>
                <HStack justifyContent="space-between" space={2}>
                    <Text color="secondary.mute" fontSize="sm" isTruncated>
                        {gameDetails}
                    </Text>
                    <Avatar.Group _avatar={{ size: '5' }}>
                        {game.listings.map((listing, i) => {
                            const assignee = listing.assignee?.node
                            return (
                                <Avatar
                                    key={listing.id}
                                    mr={i == game.listings.length - 1 ? 0 : 2.5}
                                    source={{
                                        uri: assignee?.profilePictureUrl ?? ''
                                    }}
                                />
                            )
                        })}
                    </Avatar.Group>
                </HStack>
            </VStack>
        </PressableX>
    )
}
