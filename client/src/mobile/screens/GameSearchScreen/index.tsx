import { isSameDay } from 'date-fns'
import { HStack, VStack } from 'native-base'

import ScreenContainer from '@/components/ScreenContainer'
import GameCalendar from '@/features/GameCalendar'
import { NavRoute } from "@/mobile/navigation/routes"
import { TabsStackScreenProps } from '@/mobile/navigation/types'

import { useScreenQuery } from './index.generated'

type Props = TabsStackScreenProps<NavRoute.Search>

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
        navigate(NavRoute.Game, {
            gameId
        })
    }

    return (
        <ScreenContainer title="Search">
            <VStack space="md">
                {openGames.map((game, i) => {
                    const newDay =
                        i === 0 ||
                        !isSameDay(openGames[i - 1].startTime, game.startTime)

                    return (
                        <HStack key={game.id} alignItems="center" space="md">
                            {newDay ? (
                                <GameCalendar.Date date={game.startTime} />
                            ) : (
                                <GameCalendar.EmptyDate />
                            )}
                            <GameCalendar.Item
                                game={game}
                                onPress={() => onGamePress(game.id)}
                                status={
                                    <GameCalendar.AssignmentStatus
                                        game={game}
                                    />
                                }
                            />
                        </HStack>
                    )
                })}
            </VStack>
        </ScreenContainer>
    )
}
