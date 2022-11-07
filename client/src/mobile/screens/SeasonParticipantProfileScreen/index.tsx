import { Badge, Heading, HStack, Text, useDisclose, VStack } from 'native-base'
import { useEffect, useState } from 'react'

import ActionsheetX from '@/components/AppActionsheet'
import DividedList from '@/components/DividedList'
import MaterialIcon from '@/components/MaterialIcon'
import IconOption from '@/components/MenuItem'
import Navigable from '@/components/Navigable'
import OptionsButton from '@/components/OptionsButton'
import ScreenContainer from '@/components/ScreenContainer'
import Subheader from '@/components/Subheader'
import Surface from '@/components/Surface'
import UserAvatar from '@/features/UserAvatar'
import { RootStackRoute } from '@/mobile/navigation/navigators/Root/Stack'
import { RootStackScreenProps } from '@/mobile/navigation/types'

import { useRemoveSeasonParticipantMutation } from '../../../graphql/mutations/RemoveSeasonParticipant/index.generated'

import {
    ScreenQueryVariables,
    usePermissionQuery,
    useScreenQuery
} from './index.generated'

export type SeasonGameNewScreenProps =
    RootStackScreenProps<RootStackRoute.SeasonParticipantProfile>

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

        const { viewerCanSeeSensitiveDetails } =
            permissionData.season.participant

        setVariables({
            seasonId,
            userId,
            includeSensitive: viewerCanSeeSensitiveDetails
        })
    }, [permissionData])

    if (!screenData || !permissionData) {
        return null
    }

    const { season } = screenData
    const { participant } = season

    const { firstName, lastName, phoneNumber, fullAddress } = participant.user

    const { viewerCanSeeSensitiveDetails } = permissionData.season.participant

    const onRefereeSettingsPress = () => {
        navigate(RootStackRoute.RefreeSettings, {
            seasonId,
            userId
        })
    }

    const onOptionsPress = () => {
        optionsSheetDisclose.onOpen()
    }

    const onRemoveParticipantPress = async (
        seasonId: string,
        userId: string
    ) => {
        await removeSeasonParticipant({
            input: {
                seasonId,
                userId
            }
        })

        optionsSheetDisclose.onClose()
        pop()
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
                            {firstName} {lastName}
                        </Heading>
                        <HStack space="xs">
                            <Text color="secondary.mute">{season.name}</Text>
                            <Badge colorScheme="primary">Manager</Badge>
                        </HStack>
                    </VStack>
                </VStack>
                <VStack space="sm">
                    <DividedList.Group>
                        {viewerCanSeeSensitiveDetails && (
                            <DividedList.Item onPress={onRefereeSettingsPress}>
                                <Navigable>
                                    <IconOption
                                        icon={<MaterialIcon name="cog" />}
                                    >
                                        <Text>Referee settings</Text>
                                    </IconOption>
                                </Navigable>
                            </DividedList.Item>
                        )}
                    </DividedList.Group>
                </VStack>
                {phoneNumber && (
                    <VStack space="sm">
                        <Subheader>Phone Number</Subheader>
                        <Surface>
                            <Text>{phoneNumber}</Text>
                        </Surface>
                    </VStack>
                )}
                {viewerCanSeeSensitiveDetails && fullAddress && (
                    <VStack space="sm">
                        <Subheader>Address</Subheader>
                        <Surface>
                            <Text isTruncated>{fullAddress}</Text>
                        </Surface>
                    </VStack>
                )}
            </VStack>
            <ActionsheetX.Content {...optionsSheetDisclose}>
                <ActionsheetX.Item
                    onPress={() => onRemoveParticipantPress(seasonId, userId)}
                >
                    <IconOption
                        icon={
                            <MaterialIcon
                                color="danger.solid"
                                name="account-off"
                            />
                        }
                    >
                        <Text color="danger.solid">Remove</Text>
                    </IconOption>
                </ActionsheetX.Item>
            </ActionsheetX.Content>
        </ScreenContainer>
    )
}
