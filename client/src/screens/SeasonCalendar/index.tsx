import {
    WEEK_STARTS_ON,
    SEASON_CALENDAR_DAY_PARAM
} from '@/config/constants/dfns'
import SeasonCalendarGameItem from '@/features/Season/core/Calendar/GameItem'
import { useSeasonCalendarScreen_GamesQuery } from '@/generated'
import { RootStackRoute } from '@/navigation/navigators/Root/Stack'
import { RootStackScreenProps } from '@/navigation/screenProps'
import { parse, isValid, startOfWeek, addWeeks } from 'date-fns'
import { Box, HStack, VStack, Text, Button, Icon } from 'native-base'
import { getDay } from 'date-fns'
import SeasonCalendarDayHeader from '@/features/Season/core/Calendar/DayHeader'
import { addDays } from 'date-fns'
import { useEffect } from 'react'
import { Feather } from '@expo/vector-icons'

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

    const weekStart = startOfWeek(parseDayParam(day), {
        weekStartsOn: WEEK_STARTS_ON
    })

    const [{ data }] = useSeasonCalendarScreen_GamesQuery({
        variables: {
            seasonId,
            startDate: weekStart,
            endDate: addWeeks(weekStart, 1)
        }
    })

    const games = data?.season?.games || []

    const bins = [1, 2, 3, 4, 5, 6, 0].map((nDay) => {
        return games.filter((game) => {
            return getDay(game.startTime) === nDay
        })
    })

    useEffect(() => {
        setOptions({
            headerRight: () => (
                <Box mr={4}>
                    <HStack space={2} alignItems="center">
                        <Icon
                            name="chevron-left"
                            color="indigo.600"
                            as={Feather}
                        />
                        <Button variant="ghost" size="sm" colorScheme="indigo">
                            <HStack space={2} alignItems="center">
                                <Text
                                    fontWeight="medium"
                                    fontSize="md"
                                    color="blueGray.600"
                                >
                                    March
                                </Text>
                                <Icon name="calendar" as={Feather} />
                            </HStack>
                        </Button>
                        <Icon
                            name="chevron-right"
                            color="indigo.600"
                            as={Feather}
                        />
                    </HStack>
                </Box>
            )
        })
    }, [setOptions])

    return (
        <Box py={4}>
            <VStack space={4}>
                {bins.map((games, index) => {
                    addDays(weekStart, index)
                    if (!games.length) return null
                    return (
                        <HStack key={index}>
                            <SeasonCalendarDayHeader
                                date={addDays(weekStart, index)}
                                alignSelf="flex-start"
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
                                            px={4}
                                            py={1.5}
                                            key={game.id}
                                        />
                                    )
                                })}
                            </VStack>
                        </HStack>
                    )
                })}
            </VStack>
        </Box>
    )
}
