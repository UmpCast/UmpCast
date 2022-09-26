import { useIsFocused } from '@react-navigation/native'
import { format, isBefore, isSameDay } from 'date-fns'
import { FlatList, HStack, VStack, Text, Fab } from 'native-base'
import { useCallback, useEffect, useRef, useState } from 'react'
import { FlatList as RNFlatList } from 'react-native'

import { RootStackRoute } from '@/mobile/navigation/navigators/Root/Stack'
import { RootStackScreenProps } from '@/mobile/navigation/types'
import MaterialIcon from '@/nx/components/MaterialIcon'
import ScreenContainer from '@/nx/components/ScreenContainer'
import GameCalendar from '@/nx/features/GameCalendar'
import { GameCalendarItemFragment } from '@/nx/features/GameCalendar/Item.generated'

import { useScreenQuery } from './index.generated'

export type SeasonCalendarScreenProps = RootStackScreenProps<RootStackRoute.SeasonCalendar>

const ITEM_HEIGHT = 62.181819915771484

export default function SeasonCalendarScreen({ navigation, route }: SeasonCalendarScreenProps) {
    const {
        params: { seasonId }
    } = route

    const { navigate } = navigation

    const isFocused = useIsFocused()
    const ref = useRef<RNFlatList>()

    const [currentMonth, setCurrentMonth] = useState<null | Date>(null)

    const [{ data }] = useScreenQuery({
        variables: {
            seasonId
        }
    })

    useEffect(() => {
        const games = data?.season?.games

        if (!games?.length) {
            return
        }

        const scrollToDate = new Date()

        let index = games.findIndex((game) => !isBefore(new Date(game.startTime), scrollToDate))

        if (index === -1) {
            index = games.length - 1
        }

        ref.current?.scrollToIndex({
            index
        })
    }, [data])

    if (!data?.season) {
        return null
    }

    const { season } = data
    const { games, viewerCanCreateGame } = season

    const monthTitle = currentMonth ? format(currentMonth, 'MMMM') : ''

    const showCreateGameFab = isFocused && viewerCanCreateGame

    const onViewableItemsChanged = useCallback(({ viewableItems }) => {
        setCurrentMonth(viewableItems[0].startTime)
    }, [])
    const onCreateGamePress = () => {
        navigate(RootStackRoute.SeasonGameNew, {
            seasonId
        })
    }
    const onGamePress = (gameId: string) => {
        navigate(RootStackRoute.Game, {
            gameId
        })
    }

    return (
        <ScreenContainer title={monthTitle}>
            <VStack space={4}>
                {games.length > 0 ? (
                    <FlatList
                        ref={ref}
                        data={games}
                        getItemLayout={(_, index) => ({
                            length: ITEM_HEIGHT,
                            offset: ITEM_HEIGHT * index,
                            index
                        })}
                        keyExtractor={(item: GameCalendarItemFragment) => item.id}
                        onViewableItemsChanged={onViewableItemsChanged}
                        renderItem={({ item: game, index }) => {
                            const newDay =
                                index == 0 || !isSameDay(games[index - 1].startTime, game.startTime)

                            return (
                                <HStack key={game.id} alignItems="center" mb={4} space="md">
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
                        }}
                    />
                ) : (
                    <VStack alignItems="center" space={2}>
                        <Text color="indigo.600">No Games</Text>
                    </VStack>
                )}
            </VStack>
            {showCreateGameFab && (
                <Fab
                    icon={<MaterialIcon name="plus" />}
                    onPress={onCreateGamePress}
                    placement="bottom-right"
                />
            )}
        </ScreenContainer>
    )
}
