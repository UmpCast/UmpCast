import { isSameDay } from 'date-fns'
import { HStack, VStack } from 'native-base'

import ScreenContainer from '@/nx/components/ScreenContainer'
import GameCalendar from '@/nx/features/GameCalendar'

import { useScreenQuery } from './index.generated'
import { RootStackRoute } from '@/mobile/navigation/navigators/Root/Stack'
import { AppBottomTabScreenProps } from '@/mobile/navigation/types'
import { AppBottomTabRoute } from '@/mobile/navigation/navigators/App/BottomTab'

type Props = AppBottomTabScreenProps<AppBottomTabRoute.GameSearch>

export default function GameSearchScreen({ navigation }: Props) {
    const { navigate } = navigation

    const [{ data: screenData }] = useScreenQuery()

    if (!screenData?.viewer) {
        return null
    }

    const { viewer } = screenData
    const { openGames } = viewer

    if (!openGames) {
        return null
    }

    const onGamePress = (gameId: string) => {
        navigate(RootStackRoute.Game, {
            gameId
        })
    }

    return (
        <ScreenContainer title="Search">
            <VStack space="md">
                {openGames.map((game, i) => {
                    const newDay = i == 0 || !isSameDay(openGames[i - 1].startTime, game.startTime)

                    return (
                        <HStack key={game.id} alignItems="center" space="md">
                            {newDay ? (
                                <GameCalendar.Date date={game.startTime} />
                            ) : (
                                <GameCalendar.EmptyDate />
                            )}
                            <GameCalendar.Item
                                onPress={() => onGamePress(game.id)}
                                game={game}
                                status={<GameCalendar.AssignmentStatus game={game} />}
                            />
                        </HStack>
                    )
                })}
            </VStack>
        </ScreenContainer>
    )
}
