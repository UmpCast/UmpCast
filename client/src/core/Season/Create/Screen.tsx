import {
    NavigationProp,
    RouteProp,
    useNavigation,
    useRoute
} from '@react-navigation/native'
import { Box, VStack } from 'native-base'

import { RootStackParamList, RootStackRoutes } from '@/core/App/Root/Stack'

import SeasonCreateForm from './Form'

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
                <SeasonCreateForm onCreate={goBack} orgId={params.orgId} />
            </VStack>
        </Box>
    )
}
