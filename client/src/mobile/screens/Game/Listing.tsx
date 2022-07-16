import { Feather } from '@expo/vector-icons'
import { HStack, Avatar, Icon, Badge, Text } from 'native-base'

import UserAvatar from '@/features/User/Avatar'
import { GameScreen_GameListingFragment } from '@/graphql/generated'

type Props = {
    listing: GameScreen_GameListingFragment
}

export default function GameScreenListing({ listing }: Props) {
    if (!listing.assignee)
        return (
            <HStack justifyContent="space-between">
                <HStack alignItems="center" space={5}>
                    <Avatar size="sm">
                        <Icon as={Feather} color="white" name="user" />
                    </Avatar>
                    <Text color="primary.500">Open</Text>
                </HStack>
                <Badge>
                    <HStack alignItems="center" space={1}>
                        <Text>{listing.name}</Text>
                        <Icon as={Feather} name="user" size="sm" />
                    </HStack>
                </Badge>
            </HStack>
        )

    const { node: user } = listing.assignee

    return (
        <HStack key={listing.id} justifyContent="space-between">
            <HStack alignItems="center" space={5}>
                <UserAvatar size="sm" user={user} />
                <Text>
                    {user.firstName} {user.lastName}
                </Text>
            </HStack>
            <Badge>
                <HStack alignItems="center" space={1}>
                    <Text>{listing.name}</Text>
                    <Icon as={Feather} name="user" size="sm" />
                </HStack>
            </Badge>
        </HStack>
    )
}
