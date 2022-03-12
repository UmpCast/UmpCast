import {
    NavigationProp,
    RouteProp,
    useNavigation,
    useRoute
} from '@react-navigation/native'
import { VStack, Box } from 'native-base'
import { useEffect } from 'react'

import ScreenContainer from '@/components/Screen/Container'
import { RootStackParamList, RootStackRoutes } from '@/core/App/Root/Stack'
import {
    SeasonMemberAddScreen_OrganizationMemberEdgeFragment,
    useSeasonMemberAddScreenQuery
} from '@/generated'

import SeasonMemberAddItem from './Item'
import SeasonMemberAddSaveButton from './SaveButton'
import useSeasonMemberAddRequests from './useRequests'

type ScreenRouteProp = RouteProp<
    RootStackParamList,
    RootStackRoutes.SeasonMembersAdd
>

type ScreenNavigationProp = NavigationProp<
    RootStackParamList,
    RootStackRoutes.SeasonMembersAdd
>

export default function SeasonMemberAddScreen() {
    const {
        params: { seasonId }
    } = useRoute<ScreenRouteProp>()
    const { setOptions, goBack } = useNavigation<ScreenNavigationProp>()

    const [{ data }] = useSeasonMemberAddScreenQuery({
        variables: {
            seasonId
        }
    })

    const [requests, dispatch] =
        useSeasonMemberAddRequests<SeasonMemberAddScreen_OrganizationMemberEdgeFragment>()

    useEffect(() => {
        setOptions({
            headerRight: () => (
                <Box mr={2}>
                    <SeasonMemberAddSaveButton
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
                        <SeasonMemberAddItem
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
