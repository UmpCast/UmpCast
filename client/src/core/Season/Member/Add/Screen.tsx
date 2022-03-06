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

import SeasonMemberAddButton from './Button'
import SeasonMemberAddItem from './Item'
import usePendingPermissions from './usePendingPermissions'

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

    const [pendingBatch, dispatch] = usePendingPermissions()

    useEffect(() => {
        setOptions({
            headerRight: () => (
                <Box mr={2}>
                    <SeasonMemberAddButton
                        onBatchAddMemberToSeason={goBack}
                        pendingBatch={pendingBatch}
                        seasonId={seasonId}
                    />
                </Box>
            )
        })
    }, [pendingBatch])

    useEffect(() => {
        const userIds = data?.season?.memberStatusList?.map(
            (status) => status.permit.user.id
        )
        if (!userIds) return
        dispatch({ type: 'initialize', userIds })
    }, [data])

    if (!data?.season?.memberStatusList) return null
    const { memberStatusList } = data.season

    return (
        <ScreenContainer>
            <VStack space={2}>
                {memberStatusList.map((status) => {
                    const { permit } = status
                    const { user } = permit

                    return (
                        <SeasonMemberAddItem
                            key={permit.id}
                            onToggle={(permission) => {
                                dispatch({
                                    type: 'permission.toggle',
                                    userId: user.id,
                                    permission
                                })
                            }}
                            pendingPermissions={pendingBatch[user.id] ?? []}
                            status={status}
                        />
                    )
                })}
            </VStack>
        </ScreenContainer>
    )
}
