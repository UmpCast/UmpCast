import { RootStackParamList, RootStackRoutes } from '@/core/App/Root/Stack'
import SeasonInfoItem from '@/core/Season/Info/Item'
import { useOrgSeasonScreenQuery } from '@/generated'
import { RouteProp, useRoute } from '@react-navigation/native'

type ScreenRouteProp = RouteProp<RootStackParamList, RootStackRoutes.OrgSeasons>

export default function OrgSeasonScreen() {
    const { params } = useRoute<ScreenRouteProp>()

    const [{ data }] = useOrgSeasonScreenQuery({
        variables: {
            id: params.id
        }
    })

    if (!data?.organization?.seasonList) return null

    return data.organization.seasonList.map((season) => {
        return season && <SeasonInfoItem key={season.id} />
    })
}
