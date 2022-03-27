import { useNavigation, useRoute } from '@react-navigation/native'
import { Box, VStack, Button } from 'native-base'

import useSeasonCreateForm from '@/features/OrgSeason/core/Create/useForm'

import SeasonCreateForm from './Form'
import { AppRootStackRoute } from '@/navigation/navigators/Root/Stack'
import { AppRootStackScreenProps } from '@/navigation/screenProps'

type ScreenProps = AppRootStackScreenProps<AppRootStackRoute.SeasonCreate>

export default function SeasonCreateScreen() {
    const { params } = useRoute<ScreenProps['route']>()
    const { goBack } = useNavigation<ScreenProps['navigation']>()

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
