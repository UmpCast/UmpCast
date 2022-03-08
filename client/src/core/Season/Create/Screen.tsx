import {
    NavigationProp,
    RouteProp,
    useNavigation,
    useRoute
} from '@react-navigation/native'
import { Box, VStack, Button } from 'native-base'

import { RootStackParamList, RootStackRoutes } from '@/core/App/Root/Stack'

import SeasonCreateForm from './Form'
import useSeasonCreateForm from './useForm'

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

    const { onSubmit, control } = useSeasonCreateForm({
        orgId: params.orgId,
        onCreate: goBack
    })

    return (
        <Box p={4}>
            <VStack space={6}>
                <SeasonCreateForm control={control} />
                <Button colorScheme="indigo" onPress={onSubmit}>
                    Create
                </Button>
            </VStack>
        </Box>
    )
}
