import { format, isSameDay } from 'date-fns'
import { HStack, VStack, Text, Heading } from 'native-base'

import MaterialIcon from '@/nx/components/MaterialIcon'
import ScreenContainer from '@/nx/components/ScreenContainer'
import GameCalendar from '@/nx/features/GameCalendar'

import { useScreenQuery } from './index.generated'
import { RootStackRoute } from '@/mobile/navigation/navigators/Root/Stack'
import { AppBottomTabScreenProps } from '@/mobile/navigation/types'
import { AppBottomTabRoute } from '@/mobile/navigation/navigators/App/BottomTab'

type Props = AppBottomTabScreenProps<AppBottomTabRoute.Home>

export default function HomeScreen({ navigation }: Props) {
    const { navigate } = navigation

    const [{ data }] = useScreenQuery()

    if (!data?.viewer) {
        return null
    }

    const { viewer } = data
    const { assignedListings } = viewer

    const onGamePress = (gameId: string) => {
        navigate(RootStackRoute.Game, {
            gameId
        })
    }

    return (
        <ScreenContainer title="Home">
            <VStack space="md">
                <Heading size="md">Your Upcoming Games</Heading>
                {assignedListings.map((viewerListing, i) => {
                    const { game } = viewerListing

                    const newDay =
                        i == 0 || !isSameDay(assignedListings[i - 1].game.startTime, game.startTime)

                    return (
                        <HStack key={viewerListing.id} alignItems="center" space="md">
                            {newDay ? (
                                <GameCalendar.Date date={game.startTime} />
                            ) : (
                                <GameCalendar.EmptyDate />
                            )}
                            <GameCalendar.Item
                                onPress={() => onGamePress(game.id)}
                                game={game}
                                status={
                                    <HStack alignItems="center" space={1}>
                                        <Text color="primary.600" fontSize="sm">
                                            {viewerListing.name}
                                        </Text>
                                        <MaterialIcon
                                            color="primary.600"
                                            name="account-check"
                                            size="sm"
                                        />
                                    </HStack>
                                }
                            />
                        </HStack>
                    )
                })}
            </VStack>
        </ScreenContainer>
    )
}
