import { Feather } from '@expo/vector-icons'
import {
    Avatar,
    Badge,
    Button,
    Heading,
    HStack,
    Icon,
    Pressable,
    Text,
    useDisclose,
    VStack
} from 'native-base'

import ScreenContainer from '@/components/Screen/Container'
import OrgProfileLogo from '@/features/Org/core/Profile/Logo'
import {
    GameScreen_GameListingFragment,
    useGameScreenQuery
} from '@/graphql/generated'
import { RootStackRoute } from '@/mobile/navigation/navigators/Root/Stack'
import { RootStackScreenProps } from '@/mobile/navigation/types'
import UserAvatar from '@/features/User/Avatar'

type GameScreenProps = RootStackScreenProps<RootStackRoute.Game>

export default function GameScreen({ route }: GameScreenProps) {
    const { params } = route
    const { gameId } = params

    const [{ data }] = useGameScreenQuery({
        variables: {
            gameId
        }
    })

    const sheetDisclose = useDisclose()

    const onListingPress = (listing: GameScreen_GameListingFragment) => {}

    if (!data?.game) return null

    const { game } = data
    const { division, listings } = game
    const { season } = division
    const { organization } = season

    return (
        <ScreenContainer>
            <VStack space={4}>
                <HStack alignItems="center" space={3}>
                    <OrgProfileLogo org={organization} size={20} />
                    <Text
                        color="secondary.500"
                        fontSize="md"
                        fontWeight="semibold"
                    >
                        {season.name} / {division.name}
                    </Text>
                </HStack>
                <Heading>{game.name}</Heading>
                <HStack space="3">
                    <Icon as={Feather} name="clock" />
                    <Text>Fri, Mar 3 12pm - 1:30pm</Text>
                </HStack>
                <HStack space="3">
                    <Icon as={Feather} name="map-pin" />
                    <Text>Mitchell Field Ball Park</Text>
                </HStack>
                <VStack space={1}>
                    <Text bold>Assignees</Text>
                    {listings.map((listing) => {
                        if (!listing.assignee)
                            return (
                                <Pressable
                                    onPress={() => console.log('w')}
                                    key={listing.id}
                                    _hover={{
                                        backgroundColor: 'blueGray.100'
                                    }}
                                    _pressed={{
                                        backgroundColor: 'blueGray.200'
                                    }}
                                    padding={2}
                                    borderRadius="sm"
                                >
                                    <HStack justifyContent="space-between">
                                        <HStack alignItems="center" space={5}>
                                            <Avatar size="sm">
                                                <Icon
                                                    as={Feather}
                                                    name="user"
                                                    color="white"
                                                />
                                            </Avatar>
                                            <Text color="primary.500">
                                                Open
                                            </Text>
                                        </HStack>
                                        <Badge>
                                            <HStack
                                                alignItems="center"
                                                space={1}
                                            >
                                                <Text>{listing.name}</Text>
                                                <Icon
                                                    as={Feather}
                                                    name="user"
                                                    size="sm"
                                                />
                                            </HStack>
                                        </Badge>
                                    </HStack>
                                </Pressable>
                            )

                        const { node: user } = listing.assignee

                        return (
                            <Pressable
                                onPress={() => console.log('w')}
                                key={listing.id}
                                _hover={{
                                    backgroundColor: 'blueGray.100'
                                }}
                                _pressed={{
                                    backgroundColor: 'blueGray.200'
                                }}
                                padding={2}
                                borderRadius="sm"
                            >
                                <HStack
                                    justifyContent="space-between"
                                    key={listing.id}
                                >
                                    <HStack alignItems="center" space={5}>
                                        <UserAvatar
                                            uri={user.profilePictureUrl}
                                            size="sm"
                                        />
                                        <Text>
                                            {user.firstName} {user.lastName}
                                        </Text>
                                    </HStack>
                                    <Badge>
                                        <HStack alignItems="center" space={1}>
                                            <Text>{listing.name}</Text>
                                            <Icon
                                                as={Feather}
                                                name="user"
                                                size="sm"
                                            />
                                        </HStack>
                                    </Badge>
                                </HStack>
                            </Pressable>
                        )
                    })}
                </VStack>
            </VStack>
        </ScreenContainer>
    )
}