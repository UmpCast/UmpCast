import MaterialIcon from '@/nx/components/MaterialIcon'
import Surface from '@/nx/components/Surface'
import { format } from 'date-fns'
import { Avatar, HStack, Text, VStack } from 'native-base'
import { GameCalendarItemFragment } from './Item.generated'
import { ReactNode } from 'react'

interface Props {
    game: GameCalendarItemFragment
    status: ReactNode
}

export default function Item({ game, status }: Props) {
    const gameDetails =
        format(game.startTime, 'h:mm aa') + (game.location ? ` at ${game.location}` : '')

    return (
        <Surface flex={1}>
            <VStack space={1}>
                <HStack justifyContent="space-between">
                    <Text fontSize="sm" fontWeight="semibold" isTruncated={true}>
                        {game.name}
                    </Text>
                    {status}
                </HStack>
                <HStack justifyContent="space-between" space={2}>
                    <Text color="secondary.400" fontSize="sm" isTruncated={true}>
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
        </Surface>
    )
}
