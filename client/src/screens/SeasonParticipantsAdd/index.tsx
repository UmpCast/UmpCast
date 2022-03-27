import { useNavigation, useRoute } from '@react-navigation/native'
import { VStack, Box } from 'native-base'
import { useEffect } from 'react'

import ScreenContainer from '@/components/Screen/Container'
import {
    useSeasonParticipantsAddScreenQuery,
    SeasonParticipantsAddScreen_OrganizationMemberEdgeFragment
} from '@/generated'
import { RootStackRoute } from '@/navigation/navigators/Root/Stack'
import SeasonParticipantAddItem from '@/features/SeasonParticipant/core/BatchAdd/Item'
import SeasonParticipantAddSaveButton from '@/features/SeasonParticipant/core/BatchAdd/SaveButton'
import useSeasonParticipantAddRequests from '@/features/SeasonParticipant/core/BatchAdd/useRequest'
import { RootStackScreenProps } from '@/navigation/screenProps'

type ScreenProps = RootStackScreenProps<RootStackRoute.SeasonParticipantsAdd>

export default function SeasonParticipantsAddScreen() {
    const {
        params: { seasonId }
    } = useRoute<ScreenProps['route']>()
    const { setOptions, goBack } = useNavigation<ScreenProps['navigation']>()

    const [{ data }] = useSeasonParticipantsAddScreenQuery({
        variables: {
            seasonId
        }
    })

    const [requests, dispatch] =
        useSeasonParticipantAddRequests<SeasonParticipantsAddScreen_OrganizationMemberEdgeFragment>()

    useEffect(() => {
        setOptions({
            headerRight: () => (
                <Box mr={2}>
                    <SeasonParticipantAddSaveButton
                        onAdd={goBack}
                        pendingRequests={requests}
                        seasonId={seasonId}
                    />
                </Box>
            )
        })
    }, [requests, goBack, seasonId])

    useEffect(() => {
        const members = data?.season?.organization.members ?? []
        dispatch({ type: 'initialize', members })
    }, [data])

    return (
        <ScreenContainer>
            <VStack space={2}>
                {requests.map((request) => {
                    const { node: user } = request.member

                    return (
                        <SeasonParticipantAddItem
                            key={user.id}
                            onToggle={(role) => {
                                dispatch({
                                    type: 'permission.toggle',
                                    userId: user.id,
                                    role
                                })
                            }}
                            request={request}
                        />
                    )
                })}
            </VStack>
        </ScreenContainer>
    )
}
