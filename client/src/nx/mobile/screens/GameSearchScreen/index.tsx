import { isSameDay } from 'date-fns'
import { HStack, VStack } from 'native-base'

import ScreenContainer from '@/nx/components/ScreenContainer'

import { useScreenQuery } from './index.generated'
import GameCalendar from '@/nx/features/GameCalendar'

export default function GameSearchScreen() {
    const [{ data: screenData }] = useScreenQuery()

    if (!screenData?.viewer) {
        return null
    }

    const { viewer } = screenData
    const { openGames } = viewer

    if (!openGames) {
        return null
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
