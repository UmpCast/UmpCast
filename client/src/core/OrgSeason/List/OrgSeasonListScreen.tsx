import {
    NavigationProp,
    RouteProp,
    useNavigation,
    useRoute
} from '@react-navigation/native'
import { VStack, Box, Heading, HStack } from 'native-base'

import { useOrgSeasonScreenQuery } from '@/generated'

import { RootStackParamList, RootStackRoutes } from './AppRootStack'
import SeasonCreateButton from '../core/Season/Create/SeasonCreateButton'
import SeasonInfoItem from './SeasonInfoItem'

type ScreenRouteProp = RouteProp<RootStackParamList, RootStackRoutes.OrgSeasons>
type ScreenNavigationProp = NavigationProp<
    RootStackParamList,
    RootStackRoutes.OrgSeasons
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
                                            RootStackRoutes.SeasonSettings,
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
