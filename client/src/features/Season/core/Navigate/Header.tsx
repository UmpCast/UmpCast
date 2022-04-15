import { Feather } from '@expo/vector-icons'
import {
    Actionsheet,
    Box,
    Text,
    HStack,
    useDisclose,
    Button,
    VStack,
    Icon
} from 'native-base'

import { useSesaonNavigateHeaderQuery } from '@/generated'
import NavHeaderTitle from '@/navigation/HeaderTitle'
import { RootStackRoute } from '@/navigation/navigators/Root/Stack'
import { RootStackScreenProps } from '@/navigation/screenProps'
import { buildID, TestID } from '@/testing/testID'

export type SeasonNavigateRoute = RootStackRoute.Settings

const seasonNavigateRouteTitle = {
    [RootStackRoute.Settings]: 'Settings'
}

export type SeasonNavigateHeaderProps =
    RootStackScreenProps<SeasonNavigateRoute>

export default function SeasonNavigateHeader({
    route,
    navigation
}: SeasonNavigateHeaderProps) {
    const { navigate } = navigation
    const {
        params: { seasonId }
    } = route

    const selectSheetDisclose = useDisclose()

    const [{ data }] = useSesaonNavigateHeaderQuery({
        variables: {
            seasonId
        }
    })

    const onNavigate = (nextRoute: SeasonNavigateRoute) => {
        selectSheetDisclose.onClose()
        setTimeout(() => {
            navigate(nextRoute, {
                seasonId
            })
        }, 500)
    }

    const routeTitle = seasonNavigateRouteTitle[route.name]

    return (
        <Box>
            <Button
                onPress={() => {
                    selectSheetDisclose.onOpen()
                }}
                variant="unstyled"
            >
                {data?.season && (
                    <VStack>
                        <NavHeaderTitle fontSize="md">
                            {data.season.name}
                        </NavHeaderTitle>
                        <HStack alignItems="center" space={1}>
                            <Text color="indigo.600">{routeTitle}</Text>
                            <Icon
                                as={Feather}
                                color="indigo.600"
                                name="chevron-down"
                                size={3}
                            />
                        </HStack>
                    </VStack>
                )}
            </Button>
            <Actionsheet
                {...selectSheetDisclose}
                testID={buildID(TestID.COMPONENT, 'SeasonNavigateSelectSheet')}
            >
                <Actionsheet.Content>
                    <Actionsheet.Item
                        onPress={() => {
                            onNavigate(RootStackRoute.Settings)
                        }}
                    >
                        Settings
                    </Actionsheet.Item>
                </Actionsheet.Content>
            </Actionsheet>
        </Box>
    )
}
