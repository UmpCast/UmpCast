import { RootStackParamList, RootStackRoutes } from '@/core/App/Root/Stack'
import {
    NavigationProp,
    RouteProp,
    useNavigation,
    useRoute
} from '@react-navigation/native'
import { Box } from 'native-base'
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

    return (
        <Box mr={2}>
            <SeasonMemberAddButton
                onPress={() => {
                    navigate(RootStackRoutes.SeasonMembersAdd, {
                        seasonId
                    })
                }}
            />
        </Box>
    )
}
