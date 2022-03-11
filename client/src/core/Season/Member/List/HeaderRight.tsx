import {
    NavigationProp,
    RouteProp,
    useNavigation,
    useRoute
} from '@react-navigation/native'
import { Box } from 'native-base'

import { RootStackParamList, RootStackRoutes } from '@/core/App/Root/Stack'
import {
    OrganizationRoleType,
    useSeasonMemberListHeaderRightQuery
} from '@/generated'

import SeasonMemberAddButton from '../Add/Button'
import { useSeasonMemberOrgRole } from '../useOrgRole'

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

    const role = useSeasonMemberOrgRole(data)

    return (
        <Box mr={2}>
            {role === OrganizationRoleType.Owner ? (
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
