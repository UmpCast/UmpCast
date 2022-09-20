import { useIsFocused } from '@react-navigation/native'
import { format, isBefore, isSameDay, isSameWeek, startOfDay, startOfWeek } from 'date-fns'
import { Box, FlatList, HStack, VStack, Text } from 'native-base'
import { useEffect, useRef } from 'react'
import { FlatList as RNFlatList } from 'react-native'

import {
    OrganizationRoleType,
    SeasonCalendarScreen_GameFragment as Game,
    useSeasonCalendarScreen_GamesQuery
} from '@/graphql/generated'
import useSeasonOrgRole from '@/hooks/useSeasonOrgRole'
import { RootStackRoute } from '@/mobile/navigation/navigators/Root/Stack'
import { RootStackScreenProps } from '@/mobile/navigation/types'

import SeasonCalendarDayHeader from './DayHeader'
import GameCreateFAB from './GameCreateFAB'
import SeasonCalendarGameItem from './GameItem'
import SeasonCalendarNoGames from './NoGames'
import MaterialIcon from '@/nx/components/MaterialIcon'
import { Feather } from '@expo/vector-icons'
import { date } from 'faker'

export type SeasonCalendarScreenProps = RootStackScreenProps<RootStackRoute.SeasonCalendar>

// until bidirectional infinite scroll is supported
const PAGE_SIZE = 1000
const ITEM_HEIGHT = 65.06666564941406

type CalendarGame = {
    newWeek?: Date
    newDay?: Date
    game: Game
}

export default function SeasonCalendarScreen({ navigation, route }: SeasonCalendarScreenProps) {
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
            games.findIndex((game) => !isBefore(new Date(game.startTime), scrollToDate)) ??
            games.length - 1

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
                            const { newDay: dayStart, game } = item
                            return (
                                <HStack key={game.id} mb={2}>
                                    <Box mt={1} width="50px">
                                        {dayStart ? (
                                            <VStack alignItems="center" mr={1} space={0.5}>
                                                <Text fontWeight="medium">
                                                    {format(dayStart, 'EEE')}
                                                </Text>
                                                <Text>{format(dayStart, 'd')}</Text>
                                            </VStack>
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
                    <VStack alignItems="center" space={2}>
                        <MaterialIcon as={Feather} name="slash" />
                        <Text>No Games</Text>
                    </VStack>
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
