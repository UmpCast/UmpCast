import { RouteProp, useRoute } from '@react-navigation/native'
import { VStack, Text } from 'native-base'

import { useSeasonAboutScreenQuery } from '@/generated'

import { RootStackParamList, RootStackRoutes } from './AppRootStack'
import SeasonInfoCard from './SeasonInfoCard'
import SeasonParticipantRoleCard from './SeasonParticipantRoleCard'
import ScreenContainer from './ScreenContainer'

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
                {data?.viewer?.season && (
                    <SeasonParticipantRoleCard
                        participatingSeason={data.viewer.season}
                    />
                )}
            </VStack>
        </ScreenContainer>
    )
}
