import ScreenContainer from '@/components/Screen/Container'
import { RootStackParamList, RootStackRoutes } from '@/core/App/Root/Stack'
import { useSeasonMemberAddScreenQuery } from '@/generated'
import {
    NavigationProp,
    RouteProp,
    useNavigation,
    useRoute
} from '@react-navigation/native'
import { VStack, Box } from 'native-base'
import { useEffect } from 'react'
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
                        seasonId={seasonId}
                        pendingBatch={pendingBatch}
                        onBatchAddMemberToSeason={goBack}
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
                            status={status}
                            key={permit.id}
                            pendingPermissions={pendingBatch[user.id] ?? []}
                            onToggle={(permission) => {
                                dispatch({
                                    type: 'permission.toggle',
                                    userId: user.id,
                                    permission
                                })
                            }}
                        />
                    )
                })}
            </VStack>
        </ScreenContainer>
    )
}
