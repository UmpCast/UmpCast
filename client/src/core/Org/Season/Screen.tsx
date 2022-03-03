import { RootStackParamList, RootStackRoutes } from '@/core/App/Root/Stack'
import SeasonInfoItem from '@/core/Season/Info/Item'
import { useOrgSeasonScreenQuery } from '@/generated'
import {
    NavigationProp,
    RouteProp,
    useNavigation,
    useRoute
} from '@react-navigation/native'
import { VStack, Box } from 'native-base'

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

    const seasonList = data.organization.seasonList

    return (
        <Box p={4}>
            <VStack space={4}>
                {seasonList.map((season) => {
                    return (
                        season && (
                            <SeasonInfoItem
                                onPress={() => {
                                    navigate(RootStackRoutes.SeasonSettings, {
                                        id: season.id
                                    })
                                }}
                                season={season}
                                key={season.id}
                            />
                        )
                    )
                })}
            </VStack>
        </Box>
    )
}
