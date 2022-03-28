import { useNavigation, useRoute } from '@react-navigation/native'
import { Box, VStack, Button } from 'native-base'

import SeasonCreateForm from '@/features/OrgSeason/core/Create/Form'
import useSeasonCreateForm from '@/features/OrgSeason/core/Create/useForm'
import { RootStackRoute } from '@/navigation/navigators/Root/Stack'
import { RootStackScreenProps } from '@/navigation/screenProps'

type ScreenProps = RootStackScreenProps<RootStackRoute.OrganizationSeasonNew>

export default function OrganizationSeasonNew() {
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
