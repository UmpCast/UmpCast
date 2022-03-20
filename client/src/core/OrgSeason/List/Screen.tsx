import {
    NavigationProp,
    RouteProp,
    useNavigation,
    useRoute
} from '@react-navigation/native'
import { VStack, Box, Heading, HStack, Button, Icon } from 'native-base'

import { useOrgSeasonListScreenQuery } from '@/generated'
import { AppRootStackParamList, AppRootStackRoute } from '@/core/App/Root/Stack'
import SeasonInfoItem from '@/core/Season/About/SeasonInfoItem'
import { AntDesign } from '@expo/vector-icons'
import { IconID } from '@/testing/testID'

type ScreenRouteProp = RouteProp<
    AppRootStackParamList,
    AppRootStackRoute.OrgSeasons
>
type ScreenNavigationProp = NavigationProp<
    AppRootStackParamList,
    AppRootStackRoute.OrgSeasons
>

export default function OrgSeasonListScreen() {
    const { params } = useRoute<ScreenRouteProp>()
    const { navigate } = useNavigation<ScreenNavigationProp>()

    const [{ data }] = useOrgSeasonListScreenQuery({
        variables: {
            id: params.id
        }
    })

    if (!data?.organization?.seasons) return null

    const { seasons } = data.organization

    return (
        <Box p={4}>
            <VStack space={4}>
                <HStack alignItems="center" justifyContent="space-between">
                    <Heading size="sm">Active</Heading>
                    <Button
                        borderRadius={100}
                        colorScheme="blueGray"
                        onPress={() => {
                            navigate(AppRootStackRoute.SeasonCreate, {
                                orgId: params.id
                            })
                        }}
                        size="sm"
                        variant="ghost"
                    >
                        <Icon
                            as={AntDesign}
                            color="indigo.500"
                            name="plus"
                            testID={IconID.SEASON_CREATE}
                        />
                    </Button>
                </HStack>
                <VStack space={4}>
                    {seasons.map(
                        (season) =>
                            season && (
                                <SeasonInfoItem
                                    key={season.id}
                                    onPress={() => {
                                        navigate(
                                            AppRootStackRoute.SeasonSettings,
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
