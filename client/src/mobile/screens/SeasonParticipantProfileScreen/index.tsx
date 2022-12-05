import { Badge, Heading, HStack, Text, useDisclose, VStack } from 'native-base'
import { useEffect, useState } from 'react'

import ActionsheetX from '@/components/OverlaySheet'
import DividedList from '@/components/DividedList'
import MaterialIcon from '@/components/MaterialIcon'
import MenuItem from '@/components/MenuItem'
import Navigable from '@/components/Navigable'
import OptionsButton from '@/components/OptionsButton'
import ScreenContainer from '@/components/ScreenContainer'
import Subheader from '@/components/Subheader'
import Surface from '@/components/Surface'
import UserAvatar from '@/features/UserAvatar'
import { NavRoute } from '@/mobile/navigation/routes'
import { TabsStackScreenProps } from '@/mobile/navigation/types'

import { useRemoveSeasonParticipantMutation } from '../../../graphql/mutations/RemoveSeasonParticipant/index.generated'

import {
    ScreenQueryVariables,
    usePermissionQuery,
    useScreenQuery
} from './index.generated'
import { Alert } from 'react-native'
import { alertCancelButton } from '@/components/Alert'
import { SeasonParticipantRoleType } from '@/mock/schema.generated'

export type SeasonGameNewScreenProps =
    TabsStackScreenProps<NavRoute.SeasonParticipantProfile>

export default function SeasonParticipantProfileScreen({
    navigation,
    route
}: SeasonGameNewScreenProps) {
    const { params } = route
    const { seasonId, userId } = params
    const { navigate, pop } = navigation

    const optionsSheetDisclose = useDisclose()
    const [variables, setVariables] = useState<ScreenQueryVariables>()

    const [, removeSeasonParticipant] = useRemoveSeasonParticipantMutation()

    const [{ data: permissionData }] = usePermissionQuery({
        variables: {
            seasonId,
            userId
        }
    })

    const [{ data: screenData }] = useScreenQuery({
        variables,
        pause: variables === undefined
    })

    useEffect(() => {
        if (!permissionData) {
            setVariables(undefined)
            return
        }

        const { viewerCanSeeRefereeDetails } =
            permissionData.season.participant

        setVariables({
            seasonId,
            userId,
            includeSensitive: viewerCanSeeRefereeDetails
        })
    }, [permissionData])

    if (!screenData || !permissionData) {
        return null
    }

    const { season } = screenData
    const { participant } = season
    const { user, permit } = participant

    const { viewerCanSeeRefereeDetails } = permissionData.season.participant

    const roleName =
        permit.role === SeasonParticipantRoleType.Manager
            ? 'Manager'
            : 'Referee'

    const onRefereeSettingsPress = () => {
        navigate(NavRoute.RefreeSettings, {
            seasonId,
            userId
        })
    }

    const onOptionsPress = () => {
        optionsSheetDisclose.onOpen()
    }

    const onRemoveParticipantPress = (seasonId: string, userId: string) => {
        Alert.alert('Remove Participant', undefined, [
            alertCancelButton,
            {
                text: 'Confirm',
                style: 'destructive',
                onPress: async () => {
                    await removeSeasonParticipant({
                        input: {
                            seasonId,
                            userId
                        }
                    })

                    optionsSheetDisclose.onClose()
                    pop()
                }
            }
        ])
    }

    return (
        <ScreenContainer
            headerRight={<OptionsButton onPress={onOptionsPress} />}
            title="Profile"
        >
            <VStack space="md">
                <VStack alignItems="center" space={3}>
                    <UserAvatar size="2xl" user={participant.user} />
                    <VStack alignItems="center" space="xs">
                        <Heading>
                            {user.firstName} {user.lastName}
                        </Heading>
                        <HStack space="xs">
                            <Text color="secondary.mute">{season.name}</Text>
                            <Badge colorScheme="primary">{roleName}</Badge>
                        </HStack>
                    </VStack>
                </VStack>
                <VStack space="sm">
                    <DividedList.Group>
                        {viewerCanSeeRefereeDetails && (
                            <DividedList.Item onPress={onRefereeSettingsPress}>
                                <Navigable>
                                    <MenuItem
                                        icon={<MaterialIcon name="cog" />}
                                    >
                                        <Text>Referee settings</Text>
                                    </MenuItem>
                                </Navigable>
                            </DividedList.Item>
                        )}
                    </DividedList.Group>
                </VStack>
                {user.phoneNumber && (
                    <VStack space="sm">
                        <Subheader>Phone Number</Subheader>
                        <Surface>
                            <Text>{user.phoneNumber}</Text>
                        </Surface>
                    </VStack>
                )}
                {viewerCanSeeRefereeDetails && user.fullAddress && (
                    <VStack space="sm">
                        <Subheader>Address</Subheader>
                        <Surface>
                            <Text isTruncated>{user.fullAddress}</Text>
                        </Surface>
                    </VStack>
                )}
            </VStack>
            <ActionsheetX.Content {...optionsSheetDisclose}>
                <ActionsheetX.Item
                    onPress={() => onRemoveParticipantPress(seasonId, userId)}
                >
                    <MenuItem
                        icon={
                            <MaterialIcon
                                color="danger.solid"
                                name="account-off"
                            />
                        }
                    >
                        <Text color="danger.solid">Remove</Text>
                    </MenuItem>
                </ActionsheetX.Item>
            </ActionsheetX.Content>
        </ScreenContainer>
    )
}
