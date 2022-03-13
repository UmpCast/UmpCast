import { OrganizationRoleType } from '@/generated'
import useSeasonViewerOrgRole from '@/hooks/useSeasonViewerOrgRole'
import {
    NavigationProp,
    RouteProp,
    useNavigation,
    useRoute
} from '@react-navigation/native'
import { Box } from 'native-base'
import { RootStackParamList, RootStackRoutes } from './AppRootStack'
import SeasonParticipantAddButton from './SeasonParticipantAddButton'

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

    const role = useSeasonViewerOrgRole({
        seasonId
    })

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
