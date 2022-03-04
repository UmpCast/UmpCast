import { RootStackParamList, RootStackRoutes } from '@/core/App/Root/Stack'
import {
    NavigationProp,
    RouteProp,
    useNavigation,
    useRoute
} from '@react-navigation/native'
import SeasonCreateForm from './Form'
import { Box, VStack } from 'native-base'

type ScreenRouteProp = RouteProp<
    RootStackParamList,
    RootStackRoutes.SeasonCreate
>

type ScreenNavigationProp = NavigationProp<
    RootStackParamList,
    RootStackRoutes.SeasonCreate
>

export default function SeasonCreateScreen() {
    const { params } = useRoute<ScreenRouteProp>()
    const { goBack } = useNavigation<ScreenNavigationProp>()

    return (
        <Box p={4}>
            <VStack space={6}>
                <SeasonCreateForm orgId={params.orgId} onCreate={goBack} />
            </VStack>
        </Box>
    )
}
