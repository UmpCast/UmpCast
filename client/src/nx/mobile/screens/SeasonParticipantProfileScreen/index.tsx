import { Checkbox, HStack, Text, VStack } from 'native-base'

import ScreenContainer from '@/components/Screen/Container'
import UserAvatar from '@/features/User/Avatar'
import { RootStackRoute } from '@/mobile/navigation/navigators/Root/Stack'
import { RootStackScreenProps } from '@/mobile/navigation/types'
import TextBox from '@/nx/components/TextBox'
import { useUpdatePositionVisibilityMutation } from '@/nx/graphql/mutations/UpdatePositionVisibility/index.generated'
import useViewerInfo from '@/nx/hooks/useViewerInfo'

import { useScreenQuery, useSensitiveDetailsQuery } from './index.generated'
import { useState, useEffect } from 'react'
import DividedList from '@/nx/components/DividedList'
import Subheader from '@/nx/components/Subheader'
import PositionTitle from '@/nx/features/PositionTitle'

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

    const [pauseScreenQuery, setPauseScreenQuery] = useState(false)

    useEffect(() => {
        setPauseScreenQuery(canReadSensitiveDetails == null)
    }, [canReadSensitiveDetails])

    const [screenResp] = useScreenQuery({
        variables: {
            seasonId: params.seasonId,
            userId: params.userId,
            includeSensitive: canReadSensitiveDetails as boolean
        },
        pause: pauseScreenQuery
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
            <VStack space="md">
                <VStack alignItems="center" space={3}>
                    <UserAvatar size="2xl" user={user} />
                    <Text bold color="secondary.700" fontSize="xl">
                        {firstName} {lastName}
                    </Text>
                </VStack>
                {phoneNumber && (
                    <VStack space="sm">
                        <Subheader>Phone Number</Subheader>
                        <TextBox>
                            <Text>{phoneNumber}</Text>
                        </TextBox>
                    </VStack>
                )}
                {canReadSensitiveDetails && (
                    <VStack space="sm">
                        <Subheader>Address</Subheader>
                        <TextBox>
                            <Text
                                isTruncated={true}
                            >{`${streetAddress} ${city}, ${state} ${zipCode}`}</Text>
                        </TextBox>
                    </VStack>
                )}
                {canReadSensitiveDetails && (
                    <VStack space="sm">
                        <Subheader>Visibility</Subheader>
                        <DividedList.Container>
                            {permit.visibility?.map((positionVis) => {
                                const { position, visible } = positionVis
                                const { division } = position

                                return (
                                    <DividedList.Item key={position.id}>
                                        <HStack
                                            justifyContent="space-between"
                                            alignItems="center"
                                        >
                                            <PositionTitle
                                                position={position}
                                                division={division}
                                            />
                                            <Checkbox
                                                isChecked={visible}
                                                isDisabled={
                                                    !viewerCanUpdateVisibility
                                                }
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
                )}
            </VStack>
        </ScreenContainer>
    )
}
