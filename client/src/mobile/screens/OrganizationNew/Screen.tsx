import { useNavigation } from '@react-navigation/native'
import { Box, Button, VStack } from 'native-base'

import OrgCreateForm from '@/features/Org/core/Create/Form'
import useOrgCreateForm from '@/features/Org/core/Create/useForm'
import { RootStackRoute } from '@/mobile/navigation/navigators/Root/Stack'
import { RootStackScreenProps } from '@/mobile/navigation/types'

export type OrganizationNewScreenProps =
    RootStackScreenProps<RootStackRoute.OrganizationNew>

export default function OrganizationNewScreen() {
    const navigation = useNavigation<OrganizationNewScreenProps['navigation']>()
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
