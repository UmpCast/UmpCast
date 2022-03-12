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
    useSeasonParticipantListHeaderRightQuery
} from '@/generated'

import SeasonParticipantAddButton from '../Add/Button'
import { useSeasonParticipantOrgRole } from '../useOrgRole'

type ScreenNavProp = NavigationProp<
    RootStackParamList,
    RootStackRoutes.SeasonParticipants
>
type ScreenRouteProp = RouteProp<
    RootStackParamList,
    RootStackRoutes.SeasonParticipants
>

export default function SeasonParticipantListHeaderRight() {
    const {
        params: { seasonId }
    } = useRoute<ScreenRouteProp>()
    const { navigate } = useNavigation<ScreenNavProp>()

    const [{ data }] = useSeasonParticipantListHeaderRightQuery({
        variables: { seasonId }
    })

    const role = useSeasonParticipantOrgRole(data)

    return (
        <Box mr={2}>
            {role === OrganizationRoleType.Owner ? (
                <SeasonParticipantAddButton
                    onPress={() => {
                        navigate(RootStackRoutes.SeasonParticipantsAdd, {
                            seasonId
                        })
                    }}
                />
            ) : null}
        </Box>
    )
}
