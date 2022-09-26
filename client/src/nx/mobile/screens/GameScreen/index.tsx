import { format } from 'date-fns'
import {
    Actionsheet,
    Avatar,
    Box,
    Divider,
    Heading,
    HStack,
    Text,
    useDisclose,
    VStack
} from 'native-base'
import { useState } from 'react'

import OrgProfileLogo from '@/features/Org/core/Profile/Logo'
import {
    GameScreen_GameFragment as Game,
    GameScreen_GameListingFragment as GameListing,
    useAssignGameListingMutation,
    useGameScreenQuery
} from '@/graphql/generated'
import { RootStackRoute } from '@/mobile/navigation/navigators/Root/Stack'
import { RootStackScreenProps } from '@/mobile/navigation/types'
import MaterialIcon from '@/nx/components/MaterialIcon'
import OptionSheet from '@/nx/components/OptionSheet'
import PressableX from '@/nx/components/PressableX'
import ScreenContainer from '@/nx/components/ScreenContainer'
import UserAvatar from '@/nx/features/UserAvatar'
import { useBasicViewerInfoQuery } from '@/nx/graphql/queries/BasicViewerInfo.generated'

type GameScreenProps = RootStackScreenProps<RootStackRoute.Game>

function formatGameTime(game: Game) {
    const { startTime, endTime } = game

    return format(startTime, 'EEE, LLL d h:mm aaa') + (endTime && format(endTime, ' - h:mm aaa'))
}

export default function GameScreen({ navigation, route }: GameScreenProps) {
    const { navigate } = navigation
    const { params } = route
    const { gameId } = params

    const [, assignGameListing] = useAssignGameListingMutation()
    const [{ data: screenData }] = useGameScreenQuery({
        variables: {
            gameId
        }
    })

    const [{ data: viewerData }] = useBasicViewerInfoQuery()

    const listingSheetDisclose = useDisclose()
    const [selectedListing, setSelectedListing] = useState<GameListing | null>(null)

    const onChangeAssigneePress = (gameListingId: string) => {
        navigate(RootStackRoute.GameListingAssignee, {
            gameListingId
        })

        listingSheetDisclose.onClose()
    }

    const onAssignSelfPress = async (userId: string, gameListingId: string) => {
        await assignGameListing({
            input: {
                userId,
                gameListingId
            }
        })

        listingSheetDisclose.onClose()
    }

    const onListingPress = (listing: GameListing) => {
        setSelectedListing(listing)
        listingSheetDisclose.onOpen()
    }

    if (!screenData?.game || !viewerData?.viewer) return null

    const { game } = screenData
    const { division, listings } = game
    const { season } = division
    const { organization } = season

    const { viewer } = viewerData

    const formattedGameTime = formatGameTime(game)

    return (
        <ScreenContainer title="Game">
            <VStack space={4}>
                <HStack alignItems="center" space={3}>
                    <OrgProfileLogo org={organization} size={20} />
                    <Text color="secondary.500" fontSize="md" fontWeight="semibold">
                        {season.name} / {division.name}
                    </Text>
                </HStack>
                <Heading>{game.name}</Heading>
                <HStack alignItems="center" space="3">
                    <MaterialIcon color="secondary.600" name="clock" size="lg" />
                    <Text>{formattedGameTime}</Text>
                </HStack>
                <HStack alignItems="center" space="3">
                    <MaterialIcon color="secondary.600" name="map-marker" size="lg" />
                    <Text>{game.location}</Text>
                </HStack>
                <VStack space={1}>
                    <Text bold>Positions</Text>
                    {listings.map((listing) => {
                        let item
                        if (!listing.assignee) {
                            item = (
                                <HStack key={listing.id} alignItems="center" space="md">
                                    <Avatar size="sm">
                                        <MaterialIcon name="account" />
                                    </Avatar>
                                    <VStack>
                                        <Text bold color="primary.600" fontSize="sm">
                                            Unassigned
                                        </Text>
                                        <Text color="secondary.400" fontSize="sm">
                                            {listing.name}
                                        </Text>
                                    </VStack>
                                </HStack>
                            )
                        } else {
                            const { node: user } = listing.assignee

                            item = (
                                <HStack key={listing.id} alignItems="center" space="md">
                                    <UserAvatar size="sm" user={user} />
                                    <VStack>
                                        <Text bold fontSize="sm">
                                            {user.firstName} {user.lastName}
                                        </Text>
                                        <Text color="secondary.400" fontSize="sm">
                                            {listing.name}
                                        </Text>
                                    </VStack>
                                </HStack>
                            )
                        }

                        return (
                            <PressableX
                                key={listing.id}
                                onPress={() => onListingPress(listing)}
                                rounded="sm"
                                size="sm"
                                variant="secondary.ghost"
                            >
                                <HStack alignItems="center" justifyContent="space-between">
                                    {item}
                                    <PressableX borderRadius="full" size="sm">
                                        <MaterialIcon name="dots-horizontal" size="lg" />
                                    </PressableX>
                                </HStack>
                            </PressableX>
                        )
                    })}
                </VStack>
            </VStack>
            {selectedListing && (
                <Actionsheet {...listingSheetDisclose}>
                    <OptionSheet.Content>
                        <Heading mb={2} size="md">
                            {selectedListing.name}
                        </Heading>
                        {selectedListing.canAssignSelf && (
                            <OptionSheet.Item
                                onPress={() => onAssignSelfPress(viewer.id, selectedListing.id)}
                            >
                                <Text>Self Assign</Text>
                            </OptionSheet.Item>
                        )}
                        <Divider backgroundColor="secondary.200" />
                        {selectedListing.canChangeAssignee && (
                            <OptionSheet.Item
                                onPress={() => onChangeAssigneePress(selectedListing.id)}
                            >
                                <Text>Change assignee</Text>
                            </OptionSheet.Item>
                        )}
                    </OptionSheet.Content>
                </Actionsheet>
            )}
        </ScreenContainer>
    )
}
