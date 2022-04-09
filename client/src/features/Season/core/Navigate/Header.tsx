import { useSesaonNavigateHeaderQuery } from '@/generated'
import NavHeaderTitle from '@/navigation/HeaderTitle'
import { RootStackRoute } from '@/navigation/navigators/Root/Stack'
import { RootStackScreenProps } from '@/navigation/screenProps'
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

type SeasonNavigateRoute = RootStackRoute.SeasonSettings

const seasonNavigateRouteTitle = {
    [RootStackRoute.SeasonSettings]: 'Settings'
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
                variant="unstyled"
                onPress={() => {
                    selectSheetDisclose.onOpen()
                }}
            >
                {data?.season && (
                    <VStack>
                        <NavHeaderTitle fontSize="md">
                            {data.season.name}
                        </NavHeaderTitle>
                        <HStack space={1} alignItems="center">
                            <Text color="indigo.600">{routeTitle}</Text>
                            <Icon
                                as={Feather}
                                name="chevron-down"
                                size={3}
                                color="indigo.600"
                            />
                        </HStack>
                    </VStack>
                )}
            </Button>
            <Actionsheet {...selectSheetDisclose}>
                <Actionsheet.Content>
                    <Actionsheet.Item
                        onPress={() => {
                            onNavigate(RootStackRoute.SeasonSettings)
                        }}
                    >
                        Settings
                    </Actionsheet.Item>
                </Actionsheet.Content>
            </Actionsheet>
        </Box>
    )
}
