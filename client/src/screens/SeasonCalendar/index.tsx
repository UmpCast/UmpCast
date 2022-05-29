import { useIsFocused } from '@react-navigation/native'
import { Box, FlatList, HStack, VStack } from 'native-base'
import { useEffect, useRef, useState } from 'react'

import SeasonCalendarDayHeader from '@/screens/SeasonCalendar/DayHeader'
import {
    OrganizationRoleType,
    SeasonCalendarScreen_GameFragment as Game,
    useSeasonCalendarScreen_GamesQuery
} from '@/generated'
import { RootStackRoute } from '@/navigation/navigators/Root/Stack'
import { RootStackScreenProps } from '@/navigation/screenProps'
import GameCreateFAB from './GameCreateFAB'
import SeasonCalendarGameItem from './GameItem'
import SeasonCalendarNoGames from './NoGames'
import { isSameDay, isSameWeek, startOfDay, startOfWeek } from 'date-fns'
import useSeasonOrgRole from '@/hooks/useSeasonOrgRole'
import { FlatList as RNFlatList } from 'react-native'

export type SeasonCalendarScreenProps =
    RootStackScreenProps<RootStackRoute.SeasonCalendar>

// until bidirectional infinite scroll is supported
const PAGE_SIZE = 1000
const ITEM_HEIGHT = 65.06666564941406

type CalendarGame = {
    startOfWeek?: Date
    startOfDay?: Date
    game: Game
}

function toCalendarGame(games: Game[]): CalendarGame[] {
    return games.map((game, index) => {
        const startTime = new Date(game.startTime)

        if (index === 0) {
            return {
                startOfWeek: startOfWeek(startTime),
                startOfDay: startOfDay(startTime),
                game
            }
        }

        const prevStartTime = new Date(games[index - 1].startTime)

        return {
            startOfWeek: isSameWeek(prevStartTime, startTime)
                ? undefined
                : startOfWeek(startTime),
            startOfDay: isSameDay(prevStartTime, startTime)
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
                    <HStack alignItems="center" space={1}></HStack>
                </Box>
            )
        })
    }, [setOptions])

    useEffect(() => {
        const games = data?.season?.games.nodes

        if (!games) {
            return
        }

        const defaultDay = day ?? new Date()

        const index =
            calendarGames.findIndex(
                ({ game }) => new Date(game.startTime) >= defaultDay
            ) || games.length - 1

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
                        renderItem={({ item }) => {
                            const { startOfDay, game } = item
                            return (
                                <HStack key={game.id} mb={2}>
                                    <Box width="50px" mt={1}>
                                        {startOfDay ? (
                                            <SeasonCalendarDayHeader
                                                alignSelf="flex-start"
                                                date={startOfDay}
                                                pt={1}
                                            />
                                        ) : null}
                                    </Box>
                                    <SeasonCalendarGameItem
                                        flex={1}
                                        key={game.id}
                                        _hover={{
                                            backgroundColor: 'blueGray.100'
                                        }}
                                        _pressed={{
                                            backgroundColor: 'blueGray.200'
                                        }}
                                        borderRadius={5}
                                        game={game}
                                        onPress={() => {}}
                                        px={2}
                                        py={1}
                                    />
                                </HStack>
                            )
                        }}
                        keyExtractor={(item: CalendarGame) => item.game.id}
                        getItemLayout={(data, index) => {
                            return {
                                length: ITEM_HEIGHT,
                                offset: ITEM_HEIGHT * index,
                                index
                            }
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
