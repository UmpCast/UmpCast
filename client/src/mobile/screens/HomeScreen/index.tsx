import { isSameDay } from 'date-fns'
import { HStack, VStack, Text, Heading } from 'native-base'

import MaterialIcon from '@/components/MaterialIcon'
import ScreenContainer from '@/components/ScreenContainer'
import GameCalendar from '@/features/GameCalendar'
import { AppBottomTabRoute } from '@/mobile/navigation/navigators/App/BottomTab'
import { RootStackRoute } from '@/mobile/navigation/navigators/Root/Stack'
import { AppBottomTabScreenProps } from '@/mobile/navigation/types'

import { useScreenQuery } from './index.generated'

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
                        i === 0 ||
                        !isSameDay(assignedListings[i - 1].game.startTime, game.startTime)

                    return (
                        <HStack key={viewerListing.id} alignItems="center" space="md">
                            {newDay ? (
                                <GameCalendar.Date date={game.startTime} />
                            ) : (
                                <GameCalendar.EmptyDate />
                            )}
                            <GameCalendar.Item
                                game={game}
                                onPress={() => onGamePress(game.id)}
                                status={
                                    <HStack alignItems="center" space={1}>
                                        <Text color="primary.solid" fontSize="sm">
                                            {viewerListing.name}
                                        </Text>
                                        <MaterialIcon
                                            color="primary.solid"
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
