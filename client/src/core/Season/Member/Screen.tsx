import { RootStackParamList, RootStackRoutes } from '@/core/App/Root/Stack'
import ScreenContainer from '@/core/Components/Screen/Container'
import { useSeasonMemberScreenQuery } from '@/generated'
import { RouteProp, useRoute } from '@react-navigation/native'
import { VStack } from 'native-base'
import SeasonMemberItem from './Item'

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
    const { memberList } = data.season

    return (
        <ScreenContainer>
            <VStack space={4}>
                {memberList.map(
                    (permit) =>
                        permit && (
                            <SeasonMemberItem permit={permit} key={permit.id} />
                        )
                )}
            </VStack>
        </ScreenContainer>
    )
}
