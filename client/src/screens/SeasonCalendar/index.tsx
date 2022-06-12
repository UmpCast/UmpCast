import { useIsFocused } from '@react-navigation/native'
import {
    isBefore,
    isSameDay,
    isSameWeek,
    startOfDay,
    startOfWeek
} from 'date-fns'
import { Box, FlatList, HStack, VStack } from 'native-base'
import { useEffect, useRef } from 'react'
import { FlatList as RNFlatList } from 'react-native'

import {
    OrganizationRoleType,
    SeasonCalendarScreen_GameFragment as Game,
    useSeasonCalendarScreen_GamesQuery
} from '@/generated'
import useSeasonOrgRole from '@/hooks/useSeasonOrgRole'
import { RootStackRoute } from '@/navigation/navigators/Root/Stack'
import { RootStackScreenProps } from '@/navigation/types'
import SeasonCalendarDayHeader from '@/screens/SeasonCalendar/DayHeader'

import GameCreateFAB from './GameCreateFAB'
import SeasonCalendarGameItem from './GameItem'
import SeasonCalendarNoGames from './NoGames'

export type SeasonCalendarScreenProps =
    RootStackScreenProps<RootStackRoute.SeasonCalendar>

// until bidirectional infinite scroll is supported
const PAGE_SIZE = 1000
const ITEM_HEIGHT = 65.06666564941406

type CalendarGame = {
    weekStart?: Date
    dayStart?: Date
    game: Game
}

function toCalendarGame(games: Game[]): CalendarGame[] {
    return games.map((game, index) => {
        const startTime = new Date(game.startTime)

        if (index === 0) {
            return {
                weekStart: startOfWeek(startTime),
                dayStart: startOfDay(startTime),
                game
            }
        }

        const prevStartTime = new Date(games[index - 1].startTime)

        return {
            weekStart: isSameWeek(prevStartTime, startTime)
                ? undefined
                : startOfWeek(startTime),
            dayStart: isSameDay(prevStartTime, startTime)
                ? undefined
                : startOfDay(startTime),
            game
        }
    })
}

export default function SeasonCalendarScreen({
    navigation,
    route
}: SeasonCalendarScreenProps) {
    const {
        params: { seasonId, day }
    } = route

    const { navigate, setOptions } = navigation

    const [{ data }] = useSeasonCalendarScreen_GamesQuery({
        variables: {
            seasonId,
            first: PAGE_SIZE
        }
    })

    const ref = useRef<RNFlatList>()

    useEffect(() => {
        setOptions({
            headerRight: () => (
                <Box mr={4}>
                    <HStack alignItems="center" space={1} />
                </Box>
            )
        })
    }, [setOptions])

    useEffect(() => {
        const games = data?.season?.games.nodes

        if (!games) {
            return
        }

        const scrollToDate = day ?? new Date()

        const index =
            games.findIndex(
                (game) => !isBefore(new Date(game.startTime), scrollToDate)
            ) ?? games.length - 1

        ref.current?.scrollToIndex({
            animated: day !== undefined,
            index
        })
    }, [data, day])

    const role = useSeasonOrgRole({ seasonId })

    const isFocused = useIsFocused()

    const games = data?.season?.games.nodes

    if (!games) {
        return null
    }

    const calendarGames = toCalendarGame(games)

    return (
        <Box mr={2}>
            <VStack space={4}>
                {calendarGames.length > 0 ? (
                    <FlatList
                        ref={ref}
                        data={calendarGames}
                        getItemLayout={(_, index) => ({
                            length: ITEM_HEIGHT,
                            offset: ITEM_HEIGHT * index,
                            index
                        })}
                        keyExtractor={(item: CalendarGame) => item.game.id}
                        renderItem={({ item }) => {
                            const { dayStart, game } = item
                            return (
                                <HStack key={game.id} mb={2}>
                                    <Box mt={1} width="50px">
                                        {dayStart ? (
                                            <SeasonCalendarDayHeader
                                                alignSelf="flex-start"
                                                date={dayStart}
                                                pt={1}
                                            />
                                        ) : null}
                                    </Box>
                                    <SeasonCalendarGameItem
                                        key={game.id}
                                        _hover={{
                                            backgroundColor: 'blueGray.100'
                                        }}
                                        _pressed={{
                                            backgroundColor: 'blueGray.200'
                                        }}
                                        borderRadius={5}
                                        flex={1}
                                        game={game}
                                        onPress={() => {}}
                                        px={2}
                                        py={1}
                                    />
                                </HStack>
                            )
                        }}
                    />
                ) : (
                    <SeasonCalendarNoGames mt={5} />
                )}
            </VStack>
            {isFocused && role === OrganizationRoleType.Owner && (
                <GameCreateFAB
                    onPress={() => {
                        navigate(RootStackRoute.SeasonGameNew, {
                            seasonId
                        })
                    }}
                />
            )}
        </Box>
    )
}
