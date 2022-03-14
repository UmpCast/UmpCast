import { RouteProp, useRoute } from '@react-navigation/native'
import { Box, VStack, Button } from 'native-base'

import { useSeasonEditScreenQuery } from '@/generated'

import { RootStackParamList, RootStackRoutes } from './AppRootStack'
import SeasonCreateForm from './SeasonCreateForm'
import useSeasonEditForm from '@/hooks/useSeasonEditForm'

type ScreenRouteProp = RouteProp<RootStackParamList, RootStackRoutes.SeasonEdit>

export default function SeasonEditScreen() {
    const {
        params: { seasonId }
    } = useRoute<ScreenRouteProp>()

    const [{ data }] = useSeasonEditScreenQuery({
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
