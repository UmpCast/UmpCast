import {
    NavigationProp,
    RouteProp,
    useNavigation,
    useRoute
} from '@react-navigation/native'
import { Box } from 'native-base'

import { OrganizationRoleType } from '@/generated'
import { AppRootStackParamList, AppRootStackRoute } from '@/core/App/Root/Stack'
import useSeasonViewerOrgRole from '@/core/Season/useViewerOrgRole'
import SeasonParticipantAddButton from '../BatchAdd/Button'

type ScreenNavProp = NavigationProp<
    AppRootStackParamList,
    AppRootStackRoute.SeasonParticipants
>
type ScreenRouteProp = RouteProp<
    AppRootStackParamList,
    AppRootStackRoute.SeasonParticipants
>

export default function SeasonParticipantListHeaderRight() {
    const {
        params: { seasonId }
    } = useRoute<ScreenRouteProp>()
    const { navigate } = useNavigation<ScreenNavProp>()

    const role = useSeasonViewerOrgRole({
        seasonId
    })

    return (
        <Box mr={2}>
            {role === OrganizationRoleType.Owner ? (
                <SeasonParticipantAddButton
                    onPress={() => {
                        navigate(AppRootStackRoute.SeasonParticipantsAdd, {
                            seasonId
                        })
                    }}
                />
            ) : null}
        </Box>
    )
}
