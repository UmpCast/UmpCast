import { RouteProp, useRoute } from '@react-navigation/native'
import { VStack, Text } from 'native-base'

import ScreenContainer from '@/components/Screen/Container'
import { RootStackParamList, RootStackRoutes } from '@/core/App/Root/Stack'
import { useSeasonAboutScreenQuery } from '@/generated'

import SeasonInfoCard from '../Info/Card'
import SeasonMemberRoleCard from '../Member/Role/Card'

type ScreenRouteProp = RouteProp<
    RootStackParamList,
    RootStackRoutes.SeasonAbout
>

export default function SeasonAboutScreen() {
    const {
        params: { seasonId }
    } = useRoute<ScreenRouteProp>()

    const [{ data }] = useSeasonAboutScreenQuery({
        variables: {
            seasonId
        }
    })

    return (
        <ScreenContainer>
            <VStack space={4}>
                <Text color="blueGray.400">SEASON</Text>
                {data?.season && <SeasonInfoCard season={data.season} />}
                <Text color="blueGray.400">YOUR ROLES</Text>
                {data?.season && <SeasonMemberRoleCard season={data.season} />}
            </VStack>
        </ScreenContainer>
    )
}
