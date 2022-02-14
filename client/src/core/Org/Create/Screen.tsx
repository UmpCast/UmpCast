import { NavigationProp, useNavigation } from '@react-navigation/native'
import { Box, Button, VStack } from 'native-base'

import { RootStackParamList, RootStackRoutes } from '@/core/App/Root/Stack'

import OrgCreateForm from './Form'
import useOrgCreateForm from './useForm'

type ScreenNavigationProp = NavigationProp<
    RootStackParamList,
    RootStackRoutes.OrgCreate
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
