import { Feather } from '@expo/vector-icons'
import { format } from 'date-fns'
import { Actionsheet, Badge, Heading, HStack, Icon, Text, useDisclose, VStack } from 'native-base'
import { useState } from 'react'

import ListItem from '@/components/List/Item'
import ScreenContainer from '@/components/Screen/Container'
import OrgProfileLogo from '@/features/Org/core/Profile/Logo'
import UserAvatarNew from '@/features/User/AvatarNew'
import UserTag from '@/features/User/Tag'
import {
    GameScreen_GameFragment as Game,
    GameScreen_GameListingFragment as GameListing,
    useGameScreenQuery,
    useAssignGameListingMutation
} from '@/graphql/generated'
import { RootStackRoute } from '@/mobile/navigation/navigators/Root/Stack'
import { RootStackScreenProps } from '@/mobile/navigation/types'
import MaterialIcon from '@/nx/components/MaterialIcon'

type GameScreenProps = RootStackScreenProps<RootStackRoute.Game>

function formatGameTime(game: Game) {
    const { startTime, endTime } = game

    return format(startTime, 'EEE, LLL d h:mm aaa') + (endTime && format(endTime, ' - h:mm aaa'))
}

export default function GameScreen({ navigation, route }: GameScreenProps) {
    const { navigate } = navigation
    const { params } = route
    const { gameId } = params

    const [_assignGameListingResp, assignGameListingExec] = useAssignGameListingMutation()

    const listingSheetDisclose = useDisclose()

    const [gameScreenResp] = useGameScreenQuery({
        variables: {
            gameId
        }
    })

    const [visibleListing, setVisibleListing] = useState<GameListing | null>(null)

    const gameScreenData = gameScreenResp.data
    if (!gameScreenData) return null

    const { game, viewer } = gameScreenData
    if (!game) return null

    const { division, listings } = game
    const { season } = division
    const { organization } = season

    const formattedGameTime = formatGameTime(game)

    const onChangeAssigneePress = (listing: GameListing) => {
        navigate(RootStackRoute.GameListingAssignee, {
            gameListingId: listing.id
        })

        listingSheetDisclose.onClose()
    }

    const onAssignSelfPress = (userId: string, gameListingId: string) => {
        assignGameListingExec({
            input: {
                userId,
                gameListingId
            }
        })

        listingSheetDisclose.onClose()
    }

    const onListingPress = (listing: GameListing) => {
        setVisibleListing(listing)
        listingSheetDisclose.onOpen()
    }

    return (
        <ScreenContainer>
            {visibleListing && viewer && (
                <Actionsheet {...listingSheetDisclose}>
                    <Actionsheet.Content>
                        <Heading alignSelf="flex-start" mx={4} my={2} size="md">
                            {visibleListing.name}
                        </Heading>
                        {visibleListing.canAssignSelf && (
                            <Actionsheet.Item
                                onPress={() => onAssignSelfPress(viewer.id, visibleListing.id)}
                            >
                                Assign to self
                            </Actionsheet.Item>
                        )}
                        {visibleListing.canChangeAssignee && (
                            <Actionsheet.Item onPress={() => onChangeAssigneePress(visibleListing)}>
                                Change assignee
                            </Actionsheet.Item>
                        )}
                    </Actionsheet.Content>
                </Actionsheet>
            )}
            <VStack space={4}>
                <HStack alignItems="center" space={3}>
                    <OrgProfileLogo org={organization} size={20} />
                    <Text color="secondary.500" fontSize="md" fontWeight="semibold">
                        {season.name} / {division.name}
                    </Text>
                </HStack>
                <VStack alignItems="center">
                    <Heading>{game.name}</Heading>
                </VStack>
                <HStack alignItems="center" space="3">
                    <MaterialIcon color="secondary.600" name="clock" size="lg" />
                    <Text>{formattedGameTime}</Text>
                </HStack>
                <HStack alignItems="center" space="3">
                    <MaterialIcon color="secondary.600" name="map-marker" size="lg" />
                    <Text>Mitchell Field Ball Park</Text>
                </HStack>
                <VStack mt={2} space={1}>
                    <Text bold>Assignees</Text>
                    {listings.map((listing) => {
                        let item
                        if (!listing.assignee) {
                            item = (
                                <HStack justifyContent="space-between">
                                    <HStack alignItems="center" space={5}>
                                        <UserAvatarNew
                                            button="sm"
                                            user={{
                                                profilePictureUrl: null
                                            }}
                                        />
                                        <Text bold color="primary.500">
                                            Open
                                        </Text>
                                    </HStack>
                                    <Badge>
                                        <HStack alignItems="center" space={1}>
                                            <Text>{listing.name}</Text>
                                            <Icon as={Feather} button="sm" name="user" />
                                        </HStack>
                                    </Badge>
                                </HStack>
                            )
                        } else {
                            const { node: user } = listing.assignee

                            item = (
                                <HStack key={listing.id} justifyContent="space-between">
                                    <UserTag user={user} />
                                    <Badge>
                                        <HStack alignItems="center" space={1}>
                                            <Text>{listing.name}</Text>
                                            <Icon as={Feather} button="sm" name="user" />
                                        </HStack>
                                    </Badge>
                                </HStack>
                            )
                        }

                        return (
                            <ListItem key={listing.id} onPress={() => onListingPress(listing)}>
                                {item}
                            </ListItem>
                        )
                    })}
                </VStack>
            </VStack>
        </ScreenContainer>
    )
}
