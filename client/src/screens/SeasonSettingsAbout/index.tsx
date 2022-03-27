import { useRoute } from '@react-navigation/native'
import { Box, Button, VStack } from 'native-base'

import SeasonCreateForm from '@/features/OrgSeason/core/Create/Form'
import useSesaonEditAboutForm from '@/features/Season/core/EditAbout/useForm'
import { useSeasonAboutEditScreenQuery } from '@/generated'
import { RootStackScreenProps } from '@/navigation/screenProps'
import { RootStackRoute } from '@/navigation/navigators/Root/Stack'

type ScreenProps = RootStackScreenProps<RootStackRoute.SeasonSettingsProfile>

export default function SeasonSettingsProfileScreen() {
    const {
        params: { seasonId }
    } = useRoute<ScreenProps['route']>()

    const [{ data }] = useSeasonAboutEditScreenQuery({
        variables: {
            seasonId
        }
    })

    const { onSubmit, control } = useSesaonEditAboutForm({
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
