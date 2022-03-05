import { RootStackParamList, RootStackRoutes } from '@/core/App/Root/Stack'
import { useSeasonMemberScreenQuery } from '@/generated'
import { RouteProp, useRoute } from '@react-navigation/native'
import { View, Text } from 'react-native'

type ScreenRouteProp = RouteProp<
    RootStackParamList,
    RootStackRoutes.SeasonMembers
>

export default function SeasonMemberScreen() {
    const { params } = useRoute<ScreenRouteProp>()

    const [{ data }] = useSeasonMemberScreenQuery({
        variables: {
            id: params.id
        }
    })

    if (!data?.season?.memberList) return null

    return (
        <View>
            <Text>Screen</Text>
        </View>
    )
}
