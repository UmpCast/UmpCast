import {
    NavigationProp,
    RouteProp,
    useNavigation,
    useRoute
} from '@react-navigation/native'
import { VStack, Box } from 'native-base'
import { useEffect } from 'react'

import ScreenContainer from '@/components/Screen/Container'
import {
    useSeasonParticipantAddScreenQuery,
    SeasonParticipantAddScreen_OrganizationMemberEdgeFragment
} from '@/generated'
import useSeasonParticipantAddRequests from '@/hooks/useSeasonParticipantAddRequests'

import { RootStackParamList, RootStackRoutes } from './AppRootStack'
import SeasonParticipantAddItem from './SeasonParticipantAddItem'
import SeasonParticipantAddSaveButton from './SeasonParticipantAddSaveButton'

type ScreenRouteProp = RouteProp<
    RootStackParamList,
    RootStackRoutes.SeasonParticipantsAdd
>

type ScreenNavigationProp = NavigationProp<
    RootStackParamList,
    RootStackRoutes.SeasonParticipantsAdd
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
