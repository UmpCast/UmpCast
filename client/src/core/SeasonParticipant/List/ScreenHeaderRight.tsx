import {
    NavigationProp,
    RouteProp,
    useNavigation,
    useRoute
} from '@react-navigation/native'
import { Box, Button } from 'native-base'

import { OrganizationRoleType } from '@/generated'
import { AppRootStackParamList, AppRootStackRoute } from '@/core/App/Root/Stack'
import useSeasonViewerOrgRole from '@/core/Season/Viewer/useOrgRole'

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
                <Button
                    colorScheme="indigo"
                    variant="ghost"
                    onPress={() => {
                        navigate(AppRootStackRoute.SeasonParticipantsAdd, {
                            seasonId
                        })
                    }}
                >
                    Add
                </Button>
            ) : null}
        </Box>
    )
}
