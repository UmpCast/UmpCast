import { format } from 'date-fns'
import { Actionsheet, Avatar, Heading, HStack, Text, useDisclose, VStack } from 'native-base'
import { useState } from 'react'

import ScreenContainer from '@/components/Screen/Container'
import OrgProfileLogo from '@/features/Org/core/Profile/Logo'
import {
    GameScreen_GameFragment as Game,
    GameScreen_GameListingFragment as GameListing,
    useGameScreenQuery,
    useAssignGameListingMutation
} from '@/graphql/generated'
import { RootStackRoute } from '@/mobile/navigation/navigators/Root/Stack'
import { RootStackScreenProps } from '@/mobile/navigation/types'
import MaterialIcon from '@/nx/components/MaterialIcon'
import UserAvatar from '@/nx/features/UserAvatar'
import PressableX from '@/nx/components/PressableX'

type GameScreenProps = RootStackScreenProps<RootStackRoute.Game>

function formatGameTime(game: Game) {
    const { startTime, endTime } = game

    return format(startTime, 'EEE, LLL d h:mm aaa') + (endTime && format(endTime, ' - h:mm aaa'))
}

export default function GameScreen({ navigation, route }: GameScreenProps) {
    const { navigate } = navigation
    const { params } = route
    const { gameId } = params

    const [assignGameListing] = useAssignGameListingMutation()

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

    const gameFormattedTime = formatGameTime(game)

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
                <Heading>{game.name}</Heading>
                <HStack space="3" alignItems="center">
                    <MaterialIcon name="clock" color="secondary.600" size="lg" />
                    <Text>{gameFormattedTime}</Text>
                </HStack>
                <HStack space="3" alignItems="center">
                    <MaterialIcon name="map-marker" color="secondary.600" size="lg" />
                    <Text>{game.location}</Text>
                </HStack>
                <VStack space={1}>
                    <Text bold>Assignees</Text>
                    {listings.map((listing) => {
                        let item
                        if (!listing.assignee) {
                            item = (
                                <HStack key={listing.id} space="md" alignItems="center">
                                    <Avatar size="sm">
                                        <MaterialIcon name="account" />
                                    </Avatar>
                                    <VStack>
                                        <Text fontSize="sm" color="primary.600" bold>
                                            Unassigned
                                        </Text>
                                        <Text fontSize="sm" color="secondary.400">
                                            Plate
                                        </Text>
                                    </VStack>
                                </HStack>
                            )
                        } else {
                            const { node: user } = listing.assignee

                            item = (
                                <HStack key={listing.id} space="md" alignItems="center">
                                    <UserAvatar user={user} size="sm" />
                                    <VStack>
                                        <Text fontSize="sm" bold>
                                            Jonathan Kao
                                        </Text>
                                        <Text fontSize="sm" color="secondary.400">
                                            Base
                                        </Text>
                                    </VStack>
                                </HStack>
                            )
                        }

                        return (
                            <PressableX
                                key={listing.id}
                                variant="secondary.ghost"
                                size="sm"
                                rounded="sm"
                                onPress={() => onListingPress(listing)}
                            >
                                <HStack justifyContent="space-between" alignItems="center">
                                    {item}
                                    <PressableX size="sm" borderRadius="full">
                                        <MaterialIcon name="dots-horizontal" size="lg" />
                                    </PressableX>
                                </HStack>
                            </PressableX>
                        )
                    })}
                </VStack>
            </VStack>
        </ScreenContainer>
    )
}
