import {
    WEEK_STARTS_ON,
    SEASON_CALENDAR_DAY_PARAM
} from '@/config/constants/dfns'
import SeasonCalendarGameItem from '@/features/Season/core/Calendar/GameItem'
import { useSeasonCalendarScreen_GamesQuery } from '@/generated'
import { RootStackRoute } from '@/navigation/navigators/Root/Stack'
import { RootStackScreenProps } from '@/navigation/screenProps'
import { parse, isValid, startOfWeek, addWeeks, format } from 'date-fns'
import { Box, HStack, useDisclose, VStack } from 'native-base'
import { getDay } from 'date-fns'
import SeasonCalendarDayHeader from '@/features/Season/core/Calendar/DayHeader'
import { addDays } from 'date-fns'
import { useEffect } from 'react'
import ScreenContainer from '@/components/Screen/Container'
import SeasonCalendarTitleButton from '@/features/Season/core/Calendar/TitleButton'
import SeasonCalendarWeekNavButton, {
    SeasonCalendarWeekNavDirection
} from '@/features/Season/core/Calendar/WeekNavButton'
import SeasonCalendarWeekSelectSheet from '@/features/Season/core/Calendar/WeekSelectSheet'
import { useLinkTo } from '@react-navigation/native'

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

    const selectedWeek = startOfWeek(parseDayParam(day), {
        weekStartsOn: WEEK_STARTS_ON
    })

    const [{ data }] = useSeasonCalendarScreen_GamesQuery({
        variables: {
            seasonId,
            startDate: selectedWeek.toISOString(),
            endDate: addWeeks(selectedWeek, 1).toISOString()
        }
    })

    //TODO(Victor): avoid using linkTo to alter url path
    const linkTo = useLinkTo()

    const setSelectedWeek = (week: Date) => {
        const newDay = format(week, SEASON_CALENDAR_DAY_PARAM)
        linkTo(`/season/${seasonId}/calendar/${newDay}`)
    }

    const weekSelectSheetDisclose = useDisclose()

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
                    <HStack space={1} alignItems="center">
                        <SeasonCalendarTitleButton
                            selectedWeek={selectedWeek}
                            onPress={() => {
                                weekSelectSheetDisclose.onOpen()
                            }}
                        />
                        <SeasonCalendarWeekNavButton
                            direction={SeasonCalendarWeekNavDirection.LAST}
                            onPress={() => {
                                setSelectedWeek(addWeeks(selectedWeek, -1))
                            }}
                        />
                        <SeasonCalendarWeekNavButton
                            direction={SeasonCalendarWeekNavDirection.NEXT}
                            onPress={() => {
                                setSelectedWeek(addWeeks(selectedWeek, 1))
                            }}
                        />
                    </HStack>
                </Box>
            )
        })
    }, [setOptions, selectedWeek, setSelectedWeek])

    return (
        <ScreenContainer>
            <VStack space={4}>
                {bins.map((games, index) => {
                    addDays(selectedWeek, index)
                    if (!games.length) return null
                    return (
                        <HStack key={index}>
                            <SeasonCalendarDayHeader
                                date={addDays(selectedWeek, index)}
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
            <SeasonCalendarWeekSelectSheet
                {...weekSelectSheetDisclose}
                selectedWeek={selectedWeek}
                onWeekSelect={(week) => {
                    weekSelectSheetDisclose.onClose()
                    setSelectedWeek(week)
                }}
            />
        </ScreenContainer>
    )
}
