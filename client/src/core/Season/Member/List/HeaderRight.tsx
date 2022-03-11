import {
    NavigationProp,
    RouteProp,
    useNavigation,
    useRoute
} from '@react-navigation/native'
import { Box } from 'native-base'

import { RootStackParamList, RootStackRoutes } from '@/core/App/Root/Stack'
import { useSeasonMemberListHeaderRightQuery } from '@/generated'

import SeasonMemberAddButton from '../Add/Button'

type ScreenNavProp = NavigationProp<
    RootStackParamList,
    RootStackRoutes.SeasonMembers
>
type ScreenRouteProp = RouteProp<
    RootStackParamList,
    RootStackRoutes.SeasonMembers
>

export default function SeasonMemberListHeaderRight() {
    const {
        params: { seasonId }
    } = useRoute<ScreenRouteProp>()
    const { navigate } = useNavigation<ScreenNavProp>()

    const [{ data }] = useSeasonMemberListHeaderRightQuery({
        variables: { seasonId }
    })

    return (
        <Box mr={2}>
            {data?.season?.viewerCanAddMember ? (
                <SeasonMemberAddButton
                    onPress={() => {
                        navigate(RootStackRoutes.SeasonMembersAdd, {
                            seasonId
                        })
                    }}
                />
            ) : null}
        </Box>
    )
}
