import { Feather } from '@expo/vector-icons'
import { Box, Checkbox, Divider, HStack, Icon, Text, VStack } from 'native-base'

import ScreenContainer from '@/components/Screen/Container'
import UserAvatar from '@/features/User/Avatar'
import { RootStackRoute } from '@/mobile/navigation/navigators/Root/Stack'
import { RootStackScreenProps } from '@/mobile/navigation/types'
import TextBox from '@/nx/components/TextBox'
import { useUpdatePositionVisibilityMutation } from '@/nx/graphql/mutations/UpdatePositionVisibility/index.generated'
import useViewerInfo from '@/nx/hooks/useViewerInfo'

import { useScreenQuery, useSensitiveDetailsQuery } from './index.generated'

export type SeasonGameNewScreenProps =
    RootStackScreenProps<RootStackRoute.SeasonParticipantProfile>

export default function SeasonParticipantProfileScreen({
    route
}: SeasonGameNewScreenProps) {
    const { params } = route

    const viewer = useViewerInfo()
    const [_, updateVisExec] = useUpdatePositionVisibilityMutation()

    const [sensitiveDetailsResp] = useSensitiveDetailsQuery({
        variables: {
            seasonId: params.seasonId,
            userId: params.userId
        }
    })

    const canReadSensitiveDetails =
        sensitiveDetailsResp.data?.season?.participant
            .viewerCanReadSensitiveDetails

    const [screenResp] = useScreenQuery({
        variables: {
            seasonId: params.seasonId,
            userId: params.userId,
            includeSensitive: canReadSensitiveDetails as boolean
        },
        pause: canReadSensitiveDetails == null
    })

    if (!screenResp.data?.season) return null
    if (!viewer) return null
    const { season } = screenResp.data

    const { participant } = season
    const { permit, node: user, viewerCanUpdateVisibility } = participant

    const onVisibilityCheckBoxPress = (
        userId: string,
        positionId: string,
        isSelected: boolean
    ) => {
        updateVisExec({
            input: {
                userId,
                positionId,
                visibile: isSelected
            }
        })
    }

    const {
        firstName,
        lastName,
        phoneNumber,
        city,
        state,
        zipCode,
        streetAddress
    } = user

    return (
        <ScreenContainer>
            <VStack space={4}>
                <VStack alignItems="center" space={3}>
                    <UserAvatar size="2xl" user={user} />
                    <Text bold color="primary.700" fontSize="xl">
                        {firstName} {lastName}
                    </Text>
                </VStack>
                <VStack space={2}>
                    <Text bold color="primary.700">
                        Phone Number
                    </Text>
                    {phoneNumber && <TextBox value={phoneNumber} />}
                    {/* <Input
                        value={phoneNumber ?? undefined}
                        size="md"
                        py={3}
                        rightElement={
                            <Icon
                                as={Feather}
                                name="chevron-right"
                                size="sm"
                                mr={3}
                            />
                        }
                    /> */}
                </VStack>
                {canReadSensitiveDetails && (
                    <VStack space={2}>
                        <Text bold color="primary.700">
                            Address
                        </Text>
                        <TextBox
                            value={`${streetAddress} ${city}, ${state} ${zipCode}`}
                        />
                    </VStack>
                )}
                {canReadSensitiveDetails && (
                    <VStack space={2}>
                        <Text bold color="primary.700">
                            Visibility
                        </Text>
                        <VStack
                            bg="secondary.100"
                            divider={<Divider bg="white" />}
                            p={3}
                            rounded="sm"
                            space={2.5}
                        >
                            {permit.visibility?.map((positionVis) => {
                                const { position, visible } = positionVis
                                const { division } = position

                                return (
                                    <Box key={position.id}>
                                        <HStack
                                            justifyContent="space-between"
                                            rounded="sm"
                                            space={2}
                                        >
                                            <Text>
                                                <HStack
                                                    alignItems="center"
                                                    space={2}
                                                >
                                                    <Icon
                                                        as={Feather}
                                                        color="secondary.400"
                                                        name="user"
                                                        size="sm"
                                                    />
                                                    <Text>
                                                        {division.name} /{' '}
                                                        {position.name}
                                                    </Text>
                                                </HStack>
                                            </Text>
                                            <Checkbox
                                                isChecked={visible}
                                                isDisabled={
                                                    !viewerCanUpdateVisibility
                                                }
                                                onChange={(isSelected) =>
                                                    onVisibilityCheckBoxPress(
                                                        viewer.id,
                                                        position.id,
                                                        isSelected
                                                    )
                                                }
                                                value="ax"
                                            />
                                        </HStack>
                                    </Box>
                                )
                            })}
                        </VStack>
                    </VStack>
                )}
            </VStack>
        </ScreenContainer>
    )
}
