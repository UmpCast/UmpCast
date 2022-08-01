import ListItem from '@/components/List/Item'
import ScreenContainer from '@/components/Screen/Container'
import UserAvatar from '@/features/User/Avatar'
import { RootStackRoute } from '@/mobile/navigation/navigators/Root/Stack'
import { RootStackScreenProps } from '@/mobile/navigation/types'
import { Box, Checkbox, Divider, HStack, Icon, Text, VStack } from 'native-base'
import { useScreenQuery, useSensitiveDetailsQuery } from './index.generated'
import { Feather } from '@expo/vector-icons'
import TextBox from '@/nx/components/TextBox'
import useViewerInfo from '@/nx/hooks/useViewerInfo'
import { useUpdatePositionVisibilityMutation } from '@/nx/graphql/mutations/UpdatePositionVisibility/index.generated'

export type SeasonGameNewScreenProps =
    RootStackScreenProps<RootStackRoute.SeasonParticipantProfile>

export default function SeasonParticipantProfileScreen({
    route
}: SeasonGameNewScreenProps) {
    const { params } = route
    const { seasonId, userId } = params

    const viewer = useViewerInfo()
    const [_, updateVisExec] = useUpdatePositionVisibilityMutation()

    const [sensitiveDetailsResp] = useSensitiveDetailsQuery({
        variables: {
            seasonId,
            userId
        }
    })

    const canReadSensitiveDetails =
        sensitiveDetailsResp.data?.season?.participant
            .viewerCanReadSensitiveDetails

    const [screenResp] = useScreenQuery({
        variables: {
            seasonId,
            userId,
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
                    <UserAvatar user={user} size="2xl" />
                    <Text fontSize="xl" bold color="primary.700">
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
                            space={2.5}
                            divider={<Divider bg="white" />}
                            bg="secondary.100"
                            rounded="sm"
                            p={3}
                        >
                            {permit.visibility?.map((positionVis) => {
                                const { position, visible } = positionVis
                                const { division } = position

                                return (
                                    <Box key={position.id}>
                                        <HStack
                                            space={2}
                                            rounded="sm"
                                            justifyContent="space-between"
                                        >
                                            <Text>
                                                <HStack
                                                    space={2}
                                                    alignItems="center"
                                                >
                                                    <Icon
                                                        as={Feather}
                                                        size="sm"
                                                        name="user"
                                                        color="secondary.400"
                                                    />
                                                    <Text>
                                                        {division.name} /{' '}
                                                        {position.name}
                                                    </Text>
                                                </HStack>
                                            </Text>
                                            <Checkbox
                                                isDisabled={
                                                    !viewerCanUpdateVisibility
                                                }
                                                isChecked={visible}
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
