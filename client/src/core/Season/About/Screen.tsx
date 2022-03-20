import { RouteProp, useRoute } from '@react-navigation/native'
import { VStack, Text } from 'native-base'

import ScreenContainer from '@/components/Screen/Container'
import { AppRootStackParamList, AppRootStackRoute } from '@/core/App/Root/Stack'
import { useSeasonAboutScreenQuery } from '@/generated'

import SeasonAboutCard from './Card'
import SeasonAboutViewerRolesCard from './ViewerRolesCard'

type ScreenRouteProp = RouteProp<
    AppRootStackParamList,
    AppRootStackRoute.SeasonAbout
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
                {data?.season && <SeasonAboutCard season={data.season} />}
                <Text color="blueGray.400">YOUR ROLES</Text>
                {data?.viewer?.season && (
                    <SeasonAboutViewerRolesCard
                        participatingSeason={data.viewer.season}
                    />
                )}
            </VStack>
        </ScreenContainer>
    )
}
