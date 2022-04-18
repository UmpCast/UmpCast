import { useRoute } from '@react-navigation/native'
import { Box, Button, VStack } from 'native-base'

import SeasonCreateForm from '@/features/OrgSeason/core/Create/Form'
import useSeasonEditAboutForm from '@/features/Season/core/EditAbout/useForm'
import { useSeasonAboutEditScreenQuery } from '@/generated'
import { RootStackRoute } from '@/navigation/navigators/Root/Stack'
import { RootStackScreenProps } from '@/navigation/screenProps'

type ScreenProps = RootStackScreenProps<RootStackRoute.SeasonProfile>

export default function SettingsProfileScreen() {
    const {
        params: { seasonId }
    } = useRoute<ScreenProps['route']>()

    const [{ data }] = useSeasonAboutEditScreenQuery({
        variables: {
            seasonId
        }
    })

    const { onSubmit, control } = useSeasonEditAboutForm({
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
