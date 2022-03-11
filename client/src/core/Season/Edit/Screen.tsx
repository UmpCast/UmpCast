import { RouteProp, useRoute } from '@react-navigation/native'
import { Box, VStack, Button } from 'native-base'

import { RootStackParamList, RootStackRoutes } from '@/core/App/Root/Stack'
import { useSeasonEditScreenQuery } from '@/generated'

import SeasonCreateForm from '../Create/Form'

import useSeasonEditForm from './useForm'

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
