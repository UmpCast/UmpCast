import { AppRootStackParamList, AppRootStackRoute } from '@/core/App/Root/Stack'
import useOrgCreateForm from '@/core/Org/Create/useForm'
import { NavigationProp, useNavigation } from '@react-navigation/native'
import { Box, Button, VStack } from 'native-base'

import OrgCreateForm from './Form'

type ScreenNavigationProp = NavigationProp<
    AppRootStackParamList,
    AppRootStackRoute.OrgCreate
>

export default function OrgCreateScreen() {
    const navigation = useNavigation<ScreenNavigationProp>()
    const { control, onSubmit } = useOrgCreateForm({
        onSuccess: () => {
            navigation.goBack()
        }
    })

    return (
        <Box p={4}>
            <VStack space={6}>
                <OrgCreateForm control={control} />
                <Button colorScheme="indigo" onPress={onSubmit}>
                    Create
                </Button>
            </VStack>
        </Box>
    )
}
