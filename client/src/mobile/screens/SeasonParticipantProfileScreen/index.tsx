import { Badge, Heading, HStack, Text, VStack } from 'native-base'

import DividedList from '@/components/DividedList'
import MaterialIcon from '@/components/MaterialIcon'
import MenuOption from '@/components/MenuItem'
import Navigable from '@/components/Navigable'
import ScreenContainer from '@/components/ScreenContainer'
import Subheader from '@/components/Subheader'
import Surface from '@/components/Surface'
import UserAvatar from '@/features/UserAvatar'
import { RootStackRoute } from '@/mobile/navigation/navigators/Root/Stack'
import { RootStackScreenProps } from '@/mobile/navigation/types'

import { usePermissionQuery, useScreenQuery } from './index.generated'

export type SeasonGameNewScreenProps = RootStackScreenProps<RootStackRoute.SeasonParticipantProfile>

export default function SeasonParticipantProfileScreen({
    navigation,
    route
}: SeasonGameNewScreenProps) {
    const { params } = route
    const { seasonId, userId } = params
    const { navigate } = navigation

    const [{ data: permissionData }] = usePermissionQuery({
        variables: {
            seasonId,
            userId
        }
    })

    const viewerCanSeeAddress = permissionData?.season.participant.viewerCanSeeAddress

    const [{ data: screenData }] = useScreenQuery({
        variables: {
            seasonId,
            userId,
            includeSensitive: Boolean(viewerCanSeeAddress)
        },
        pause: viewerCanSeeAddress == null
    })

    if (!screenData) {
        return null
    }

    const { season } = screenData
    const { participant } = season

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
                <VStack space="sm">
                    <DividedList.Group>
                        {participant.viewerCanSeePermit && (
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
                {fullAddress && (
                    <VStack space="sm">
                        <Subheader>Address</Subheader>
                        <Surface>
                            <Text isTruncated>{fullAddress}</Text>
                        </Surface>
                    </VStack>
                )}
            </VStack>
        </ScreenContainer>
    )
}
