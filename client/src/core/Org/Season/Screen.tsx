import {
    NavigationProp,
    RouteProp,
    useNavigation,
    useRoute
} from '@react-navigation/native'
import { VStack, Box, Heading, HStack, Button, Icon } from 'native-base'

import { RootStackParamList, RootStackRoutes } from '@/core/App/Root/Stack'
import SeasonInfoItem from '@/core/Season/Info/Item'
import { useOrgSeasonScreenQuery } from '@/generated'
import SeasonCreateButton from '@/core/Season/Create/Button'

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

    if (!data?.organization?.seasonList) return null

    const { seasonList } = data.organization

    return (
        <Box p={4}>
            <VStack space={4}>
                <HStack justifyContent="space-between" alignItems="center">
                    <Heading size="sm">Active</Heading>
                    <SeasonCreateButton org={{ id: params.id }} />
                </HStack>
                <VStack space={4}>
                    {seasonList.map(
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
