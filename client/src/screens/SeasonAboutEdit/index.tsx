import { useRoute } from '@react-navigation/native'
import { Box, Button, VStack } from 'native-base'

import SeasonCreateForm from '@/features/OrgSeason/core/Create/Form'
import useSeasonEditForm from '@/features/Season/core/EditDetails/useForm'
import { useSeasonAboutEditScreenQuery } from '@/generated'
import { AppRootStackScreenProps } from '@/navigation/screenProps'
import { AppRootStackRoute } from '@/navigation/navigators/Root/Stack'

type ScreenProps = AppRootStackScreenProps<AppRootStackRoute.SeasonEdit>

export default function SeasonAboutEditScreen() {
    const {
        params: { seasonId }
    } = useRoute<ScreenProps['route']>()

    const [{ data }] = useSeasonAboutEditScreenQuery({
        variables: {
            seasonId
        }
    })

    const { onSubmit, control } = useSeasonEditForm({
        seasonId,
        season: data?.season
    })

    return (
        <Box p={4}>
            <VStack space={6}>
                <SeasonCreateForm control={control} />
                <Button colorScheme="indigo" onPress={onSubmit}>
                    Save Changes
                </Button>
            </VStack>
        </Box>
    )
}
