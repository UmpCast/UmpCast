import { AppRootStackParamList, AppRootStackRoute } from '@/core/App/Root/Stack'
import useSeasonCreateForm from '@/core/OrgSeason/Create/useForm'
import {
    NavigationProp,
    RouteProp,
    useNavigation,
    useRoute
} from '@react-navigation/native'
import { Box, VStack, Button } from 'native-base'

import SeasonCreateForm from './SeasonCreateForm'

type ScreenRouteProp = RouteProp<
    AppRootStackParamList,
    AppRootStackRoute.SeasonCreate
>

type ScreenNavigationProp = NavigationProp<
    AppRootStackParamList,
    AppRootStackRoute.SeasonCreate
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
