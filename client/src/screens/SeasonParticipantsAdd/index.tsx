import { useNavigation, useRoute } from '@react-navigation/native'
import { VStack, Box } from 'native-base'
import { useEffect } from 'react'

import ScreenContainer from '@/components/Screen/Container'
import {
    useSeasonParticipantAddScreenQuery,
    SeasonParticipantAddScreen_OrganizationMemberEdgeFragment
} from '@/generated'
import {
    AppRootStackParamList,
    AppRootStackRoute
} from '@/navigation/navigators/Root/Stack'
import SeasonParticipantAddItem from '@/features/SeasonParticipant/core/BatchAdd/Item'
import SeasonParticipantAddSaveButton from '@/features/SeasonParticipant/core/BatchAdd/SaveButton'
import useSeasonParticipantAddRequests from '@/features/SeasonParticipant/core/BatchAdd/useRequest'
import { AppRootStackScreenProps } from '@/navigation/screenProps'

type ScreenProps =
    AppRootStackScreenProps<AppRootStackRoute.SeasonParticipantsAdd>

export default function SeasonParticipantAddScreen() {
    const {
        params: { seasonId }
    } = useRoute<ScreenProps['route']>()
    const { setOptions, goBack } = useNavigation<ScreenProps['navigation']>()

    const [{ data }] = useSeasonParticipantAddScreenQuery({
        variables: {
            seasonId
        }
    })

    const [requests, dispatch] =
        useSeasonParticipantAddRequests<SeasonParticipantAddScreen_OrganizationMemberEdgeFragment>()

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
