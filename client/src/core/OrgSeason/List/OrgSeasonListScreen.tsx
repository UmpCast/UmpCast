import {
    NavigationProp,
    RouteProp,
    useNavigation,
    useRoute
} from '@react-navigation/native'
import { VStack, Box, Heading, HStack } from 'native-base'

import { useOrgSeasonScreenQuery } from '@/generated'
import { AppRootStackParamList, AppRootStackRoute } from '@/core/App/Root/Stack'
import SeasonInfoItem from '@/core/Season/About/SeasonInfoItem'
import SeasonCreateButton from '../Create/SeasonCreateButton'

type ScreenRouteProp = RouteProp<
    AppRootStackParamList,
    AppRootStackRoute.OrgSeasons
>
type ScreenNavigationProp = NavigationProp<
    AppRootStackParamList,
    AppRootStackRoute.OrgSeasons
>

export default function OrgSeasonScreen() {
    const { params } = useRoute<ScreenRouteProp>()
    const { navigate } = useNavigation<ScreenNavigationProp>()

    const [{ data }] = useOrgSeasonScreenQuery({
        variables: {
            id: params.id
        }
    })

    if (!data?.organization?.seasons) return null

    const { seasons } = data.organization

    return (
        <Box p={4}>
            <VStack space={4}>
                <HStack alignItems="center" justifyContent="space-between">
                    <Heading size="sm">Active</Heading>
                    <SeasonCreateButton orgId={params.id} />
                </HStack>
                <VStack space={4}>
                    {seasons.map(
                        (season) =>
                            season && (
                                <SeasonInfoItem
                                    key={season.id}
                                    onPress={() => {
                                        navigate(
                                            AppRootStackRoute.SeasonSettings,
                                            {
                                                id: season.id
                                            }
                                        )
                                    }}
                                    season={season}
                                />
                            )
                    )}
                </VStack>
            </VStack>
        </Box>
    )
}
