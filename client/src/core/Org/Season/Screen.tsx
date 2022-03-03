import { RootStackParamList, RootStackRoutes } from '@/core/App/Root/Stack'
import SeasonInfoItem from '@/core/Season/Info/Item'
import { useOrgSeasonScreenQuery } from '@/generated'
import { RouteProp, useRoute } from '@react-navigation/native'
import { VStack, Box } from 'native-base'

type ScreenRouteProp = RouteProp<RootStackParamList, RootStackRoutes.OrgSeasons>

export default function OrgSeasonScreen() {
    const { params } = useRoute<ScreenRouteProp>()

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
                            <SeasonInfoItem season={season} key={season.id} />
                        )
                    )
                })}
            </VStack>
        </Box>
    )
}
