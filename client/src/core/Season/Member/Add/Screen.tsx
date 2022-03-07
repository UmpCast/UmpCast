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
import { useSeasonMemberAddScreenQuery } from '@/generated'

import SeasonMemberAddSaveButton from './SaveButton'
import SeasonMemberAddItem from './Item'
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

    const [requests, dispatch] = useSeasonMemberAddRequests()

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
        const statuses = data?.season?.membershipStatuses ?? []
        dispatch({ type: 'initialize', statuses })
    }, [data])

    return (
        <ScreenContainer>
            <VStack space={2}>
                {requests.map((request) => {
                    const {
                        permit: { user }
                    } = request.status

                    return (
                        <SeasonMemberAddItem
                            key={user.id}
                            onToggle={(permission) => {
                                dispatch({
                                    type: 'permission.toggle',
                                    userId: user.id,
                                    permission
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
