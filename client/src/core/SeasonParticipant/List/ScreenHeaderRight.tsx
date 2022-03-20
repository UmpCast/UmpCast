import {
    NavigationProp,
    RouteProp,
    useNavigation,
    useRoute
} from '@react-navigation/native'
import { Box, Button } from 'native-base'

import { AppRootStackParamList, AppRootStackRoute } from '@/core/App/Root/Stack'
import useSeasonViewerOrgRole from '@/core/Season/Viewer/useOrgRole'
import { OrganizationRoleType } from '@/generated'

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
                    onPress={() => {
                        navigate(AppRootStackRoute.SeasonParticipantsAdd, {
                            seasonId
                        })
                    }}
                    variant="ghost"
                >
                    Add
                </Button>
            ) : null}
        </Box>
    )
}
