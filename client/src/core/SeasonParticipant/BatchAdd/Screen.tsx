import {
    NavigationProp,
    RouteProp,
    useNavigation,
    useRoute
} from '@react-navigation/native'
import { VStack, Box } from 'native-base'
import { useEffect } from 'react'

import ScreenContainer from '@/components/Screen/Container'
import { AppRootStackParamList, AppRootStackRoute } from '@/core/App/Root/Stack'
import {
    useSeasonParticipantAddScreenQuery,
    SeasonParticipantAddScreen_OrganizationMemberEdgeFragment
} from '@/generated'

import SeasonParticipantAddItem from './Item'
import SeasonParticipantAddSaveButton from './SaveButton'
import useSeasonParticipantAddRequests from './useRequest'

type ScreenRouteProp = RouteProp<
    AppRootStackParamList,
    AppRootStackRoute.SeasonParticipantsAdd
>

type ScreenNavigationProp = NavigationProp<
    AppRootStackParamList,
    AppRootStackRoute.SeasonParticipantsAdd
>

export default function SeasonParticipantAddScreen() {
    const {
        params: { seasonId }
    } = useRoute<ScreenRouteProp>()
    const { setOptions, goBack } = useNavigation<ScreenNavigationProp>()

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
    }, [requests])

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
