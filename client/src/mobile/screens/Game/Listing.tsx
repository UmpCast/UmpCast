import UserAvatar from '@/features/User/Avatar'
import { GameScreen_GameListingFragment } from '@/graphql/generated'
import { Feather } from '@expo/vector-icons'
import { HStack, Avatar, Icon, Badge, Text } from 'native-base'

type Props = {
    listing: GameScreen_GameListingFragment
}

export default function GameScreenListing({ listing }: Props) {
    if (!listing.assignee)
        return (
            <HStack justifyContent="space-between">
                <HStack alignItems="center" space={5}>
                    <Avatar size="sm">
                        <Icon as={Feather} name="user" color="white" />
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
        <HStack justifyContent="space-between" key={listing.id}>
            <HStack alignItems="center" space={5}>
                <UserAvatar user={user} size="sm" />
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
