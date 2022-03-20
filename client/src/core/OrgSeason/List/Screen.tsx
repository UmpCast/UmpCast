import { AntDesign } from '@expo/vector-icons'
import {
    NavigationProp,
    RouteProp,
    useNavigation,
    useRoute
} from '@react-navigation/native'
import { VStack, Box, Heading, HStack, Button, Icon } from 'native-base'

import { AppRootStackParamList, AppRootStackRoute } from '@/core/App/Root/Stack'
import { useOrgSeasonListScreenQuery } from '@/generated'
import { buildID, IconID, TestID } from '@/testing/testID'

import OrgSeasonListItem from './Item'

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
                        testID={buildID(TestID.ICON, IconID.SEASON_CREATE)}
                        variant="ghost"
                    >
                        <Icon as={AntDesign} color="indigo.500" name="plus" />
                    </Button>
                </HStack>
                <VStack space={4}>
                    {seasons.map(
                        (season) =>
                            season && (
                                <OrgSeasonListItem
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
