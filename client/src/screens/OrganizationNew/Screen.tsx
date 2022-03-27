import { useNavigation } from '@react-navigation/native'
import { Box, Button, VStack } from 'native-base'

import useOrgCreateForm from '@/features/Org/core/Create/useForm'

import { RootStackRoute } from '@/navigation/navigators/Root/Stack'
import { RootStackScreenProps } from '@/navigation/screenProps'
import OrgCreateForm from '@/features/Org/core/Create/Form'

type ScreenProps = RootStackScreenProps<RootStackRoute.OrganizationNew>

export default function OrgCreateScreen() {
    const navigation = useNavigation<ScreenProps['navigation']>()
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
