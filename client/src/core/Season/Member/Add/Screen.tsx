import { RootStackParamList, RootStackRoutes } from '@/core/App/Root/Stack'
import { useSeasonMemberAddScreenQuery } from '@/generated'
import { RouteProp, useRoute } from '@react-navigation/native'

type ScreenRouteProp = RouteProp<
    RootStackParamList,
    RootStackRoutes.SeasonMembersAdd
>

export default function SeasonMemberAddScreen() {
    const {
        params: { seasonId }
    } = useRoute<ScreenRouteProp>()

    const [{ data }] = useSeasonMemberAddScreenQuery({
        variables: {
            seasonId
        }
    })

    return null
}
