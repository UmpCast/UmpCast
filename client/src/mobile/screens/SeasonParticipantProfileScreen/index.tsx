import { Badge, Heading, HStack, Text, VStack } from 'native-base'

import DividedList from '@/components/DividedList'
import MaterialIcon from '@/components/MaterialIcon'
import MenuOption from '@/components/MenuItem'
import Navigable from '@/components/Navigable'
import ScreenContainer from '@/components/ScreenContainer'
import Subheader from '@/components/Subheader'
import Surface from '@/components/Surface'
import UserAvatar from '@/features/UserAvatar'
import { useViewerParticipantRoleQuery } from '@/graphql/queries/ViewerParticipantRole.generated'
import { RootStackRoute } from '@/mobile/navigation/navigators/Root/Stack'
import { RootStackScreenProps } from '@/mobile/navigation/types'
import { SeasonParticipantRoleType } from '@/mock/schema.generated'

import { useScreenQuery } from './index.generated'

export type SeasonGameNewScreenProps = RootStackScreenProps<RootStackRoute.SeasonParticipantProfile>

export default function SeasonParticipantProfileScreen({
    navigation,
    route
}: SeasonGameNewScreenProps) {
    const { params } = route
    const { seasonId, userId } = params
    const { navigate } = navigation

    const [{ data: viewerRoleData, fetching: viewerRoleFetching }] = useViewerParticipantRoleQuery({
        variables: {
            seasonId
        }
    })

    const viewerRole = viewerRoleData?.season.viewerParticipantRole
    const viewerIsManager = viewerRole === SeasonParticipantRoleType.Manager

    const [{ data: screenData }] = useScreenQuery({
        variables: {
            seasonId,
            userId,
            includeSensitive: viewerIsManager
        },
        pause: viewerRoleFetching
    })

    if (!viewerRoleData || !screenData) {
        return null
    }

    const { season } = screenData
    const { participant } = season

    const showRoleSettings = viewerIsManager || participant.user.isViewer

    const onRefereeSettingsPress = () => {
        navigate(RootStackRoute.RefreeSettings, {
            seasonId,
            userId
        })
    }

    const { firstName, lastName, phoneNumber, fullAddress } = participant.user

    return (
        <ScreenContainer title="Profile">
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
                {}
                <VStack space="sm">
                    <DividedList.Group>
                        {showRoleSettings && (
                            <DividedList.PressableItem onPress={onRefereeSettingsPress}>
                                <Navigable>
                                    <MenuOption icon={<MaterialIcon name="cog" />}>
                                        <Text>Role settings</Text>
                                    </MenuOption>
                                </Navigable>
                            </DividedList.PressableItem>
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
                {viewerIsManager && (
                    <VStack space="sm">
                        <Subheader>Address</Subheader>
                        <Surface>
                            <Text isTruncated>{fullAddress}</Text>
                        </Surface>
                    </VStack>
                )}
                {/* {canReadSensitiveDetails && (
                    <VStack space="sm">
                        <Subheader>Visibility</Subheader>
                        <DividedList.Container>
                            {permit.visibility?.map((positionVis) => {
                                const { position, visible } = positionVis
                                const { division } = position

                                return (
                                    <DividedList.Item key={position.id}>
                                        <HStack alignItems="center" justifyContent="space-between">
                                            <PositionTitle
                                                division={division}
                                                position={position}
                                            />
                                            <Checkbox
                                                isChecked={visible}
                                                isDisabled={!viewerCanUpdateVisibility}
                                                onChange={(isSelected) => {
                                                    onVisibilityCheckBoxPress(
                                                        viewer.id,
                                                        position.id,
                                                        isSelected
                                                    )
                                                }}
                                                value=""
                                            />
                                        </HStack>
                                    </DividedList.Item>
                                )
                            })}
                        </DividedList.Container>
                    </VStack>
                )} */}
            </VStack>
        </ScreenContainer>
    )
}
