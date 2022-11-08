import { format } from 'date-fns'
import { Avatar, Heading, HStack, Text, useDisclose, VStack } from 'native-base'
import { useState } from 'react'

import OptionSheet from '@/components/OptionSheet'
import AppPressable from '@/components/AppPressable'
import MaterialIcon from '@/components/MaterialIcon'
import ScreenContainer from '@/components/ScreenContainer'
import OrgLogo from '@/features/OrgLogo'
import UserAvatar from '@/features/UserAvatar'
import { useAssignGameListingMutation } from '@/graphql/mutations/AssignGameListing/index.generated'
import { useBasicViewerInfoQuery } from '@/graphql/queries/BasicViewerInfo.generated'
import { TabsStackRoute } from '@/mobile/navigation/navigators/TabsStack/types'
import { RootStackScreenProps } from '@/mobile/navigation/types'

import {
    GameScreen_GameListingFragment,
    useGameScreenQuery
} from './index.generated'

type GameScreenProps = RootStackScreenProps<TabsStackRoute.Game>

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
    const [selectedListing, setSelectedListing] =
        useState<GameScreen_GameListingFragment | null>(null)

    if (!screenData?.game || !viewerData?.viewer) return null

    const { game } = screenData
    const { division, listings } = game
    const { season } = division
    const { organization: org } = season

    const { viewer } = viewerData

    const formattedGameTime =
        format(game.startTime, 'EEE, LLL d h:mm aaa') +
        (game.endTime && format(game.endTime, ' - h:mm aaa'))

    const onListingPress = (listing: GameScreen_GameListingFragment) => {
        const { assignee } = listing
        if (assignee) {
            navigate(TabsStackRoute.SeasonParticipantProfile, {
                seasonId: season.id,
                userId: assignee.user.id
            })
            return
        }
        setSelectedListing(listing)
        listingSheetDisclose.onOpen()
    }

    const onChangeAssigneePress = (gameListingId: string) => {
        navigate(TabsStackRoute.ChangeGameListingAssignee, {
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

    return (
        <ScreenContainer title="Game">
            <VStack space="md">
                <HStack alignItems="center" space={3}>
                    <OrgLogo org={org} size="20px" />
                    <Text
                        color="secondary.500"
                        fontSize="md"
                        fontWeight="semibold"
                    >
                        {season.name} / {division.name}
                    </Text>
                </HStack>
                <Heading>{game.name}</Heading>
                <HStack alignItems="center" space="3">
                    <MaterialIcon
                        color="secondary.600"
                        name="clock"
                        size="lg"
                    />
                    <Text>{formattedGameTime}</Text>
                </HStack>
                <HStack alignItems="center" space="3">
                    <MaterialIcon
                        color="secondary.600"
                        name="map-marker"
                        size="lg"
                    />
                    <Text>{game.location}</Text>
                </HStack>
                <VStack>
                    <Text bold>Positions</Text>
                    {listings.map((listing) => {
                        let item

                        if (!listing.assignee) {
                            item = (
                                <HStack
                                    key={listing.id}
                                    alignItems="center"
                                    space="md"
                                >
                                    <Avatar size="sm">
                                        <MaterialIcon name="account" />
                                    </Avatar>
                                    <VStack>
                                        <HStack alignItems="center" space="2xs">
                                            <Text
                                                bold
                                                color="primary.solid"
                                                fontSize="sm"
                                            >
                                                Unassigned
                                            </Text>
                                            {listing.canAssignSelf ? (
                                                <MaterialIcon
                                                    color="primary.solid"
                                                    name="lock-open"
                                                    size="sm"
                                                />
                                            ) : (
                                                <MaterialIcon
                                                    color="primary.solid"
                                                    name="lock"
                                                    size="sm"
                                                />
                                            )}
                                        </HStack>
                                        <Text
                                            color="secondary.mute"
                                            fontSize="sm"
                                        >
                                            {listing.name}
                                        </Text>
                                    </VStack>
                                </HStack>
                            )
                        } else {
                            const { assignee } = listing

                            item = (
                                <HStack
                                    key={listing.id}
                                    alignItems="center"
                                    space="md"
                                >
                                    <UserAvatar
                                        size="sm"
                                        user={assignee.user}
                                    />
                                    <VStack>
                                        <Text bold fontSize="sm">
                                            {assignee.user.firstName}{' '}
                                            {assignee.user.lastName}
                                        </Text>
                                        <Text
                                            color="secondary.mute"
                                            fontSize="sm"
                                        >
                                            {listing.name}
                                        </Text>
                                    </VStack>
                                </HStack>
                            )
                        }

                        return (
                            <AppPressable
                                key={listing.id}
                                onPress={() => onListingPress(listing)}
                                rounded="sm"
                                size="sm"
                                variant="secondary.ghost"
                            >
                                <HStack
                                    alignItems="center"
                                    justifyContent="space-between"
                                >
                                    {item}
                                    <MaterialIcon
                                        name="dots-horizontal"
                                        size="lg"
                                        mr={2}
                                    />
                                </HStack>
                            </AppPressable>
                        )
                    })}
                </VStack>
            </VStack>
            {selectedListing && (
                <OptionSheet.Content {...listingSheetDisclose}>
                    <OptionSheet.Item
                        onPress={() =>
                            onAssignSelfPress(viewer.id, selectedListing.id)
                        }
                    >
                        {selectedListing.canAssignSelf ? (
                            <Text>Self Assign</Text>
                        ) : (
                            <HStack justifyContent="space-between">
                                <Text color="secondary.mute">Self Assign</Text>
                                <MaterialIcon
                                    color="secondary.mute"
                                    name="lock"
                                />
                            </HStack>
                        )}
                    </OptionSheet.Item>
                    {selectedListing.canChangeAssignee && (
                        <OptionSheet.Item
                            onPress={() =>
                                onChangeAssigneePress(selectedListing.id)
                            }
                        >
                            <Text>Change assignee</Text>
                        </OptionSheet.Item>
                    )}
                </OptionSheet.Content>
            )}
        </ScreenContainer>
    )
}
