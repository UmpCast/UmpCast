import {
    WEEK_STARTS_ON,
    SEASON_CALENDAR_DAY_PARAM
} from '@/config/constants/dfns'
import SeasonCalendarGameItem from '@/features/Season/core/Calendar/GameItem'
import { useSeasonCalendarScreen_GamesQuery } from '@/generated'
import { RootStackRoute } from '@/navigation/navigators/Root/Stack'
import { RootStackScreenProps } from '@/navigation/screenProps'
import { parse, isValid, startOfWeek, addWeeks } from 'date-fns'
import { Box, HStack, VStack } from 'native-base'
import { getDay } from 'date-fns'
import SeasonCalendarDayHeader from '@/features/Season/core/Calendar/DayHeader'
import { addDays } from 'date-fns'
import { useEffect, useState } from 'react'
import ScreenContainer from '@/components/Screen/Container'
import SeasonCalendarRightHeader from './RightHeader'

export type SeasonCalendarScreenProps =
    RootStackScreenProps<RootStackRoute.SeasonCalendar>

function parseDayParam(day?: string) {
    if (!day) return new Date()

    const date = parse(day, SEASON_CALENDAR_DAY_PARAM, new Date())

    return isValid(date) ? date : new Date()
}

export default function SeasonCalendarScreen({
    navigation,
    route
}: SeasonCalendarScreenProps) {
    const {
        params: { seasonId, day }
    } = route

    const { setOptions } = navigation

    const [weekStart, setWeekStart] = useState(() => {
        return startOfWeek(parseDayParam(day), {
            weekStartsOn: WEEK_STARTS_ON
        })
    })

    const [{ data }] = useSeasonCalendarScreen_GamesQuery({
        variables: {
            seasonId,
            startDate: weekStart.toISOString(),
            endDate: addWeeks(weekStart, 1).toISOString()
        }
    })

    const games = data?.season?.games || []

    const bins = [1, 2, 3, 4, 5, 6, 0].map((nDay) => {
        return games.filter((game) => {
            return getDay(new Date(game.startTime)) === nDay
        })
    })

    useEffect(() => {
        setOptions({
            headerRight: () => (
                <Box mr={4}>
                    <SeasonCalendarRightHeader
                        weekStart={weekStart}
                        onWeekChange={setWeekStart}
                    />
                </Box>
            )
        })
    }, [setOptions, weekStart, setWeekStart])

    return (
        <ScreenContainer>
            <VStack space={4}>
                {bins.map((games, index) => {
                    addDays(weekStart, index)
                    if (!games.length) return null
                    return (
                        <HStack key={index}>
                            <SeasonCalendarDayHeader
                                date={addDays(weekStart, index)}
                                alignSelf="flex-start"
                                pt={1}
                            />
                            <VStack space={1} flex={1}>
                                {games.map((game) => {
                                    return (
                                        <SeasonCalendarGameItem
                                            _hover={{
                                                backgroundColor: 'blueGray.100'
                                            }}
                                            _pressed={{
                                                backgroundColor: 'blueGray.200'
                                            }}
                                            game={game}
                                            onPress={() => {}}
                                            borderRadius={5}
                                            px={2}
                                            py={1}
                                            key={game.id}
                                        />
                                    )
                                })}
                            </VStack>
                        </HStack>
                    )
                })}
            </VStack>
        </ScreenContainer>
    )
}
