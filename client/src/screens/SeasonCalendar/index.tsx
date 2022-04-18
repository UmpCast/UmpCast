import { useIsFocused, useLinkTo } from '@react-navigation/native'
import {
    isValid,
    startOfWeek,
    addWeeks,
    format,
    getDay,
    addDays
} from 'date-fns'
import { Box, HStack, useDisclose, VStack } from 'native-base'
import { useEffect } from 'react'

import ScreenContainer from '@/components/Screen/Container'
import {
    WEEK_STARTS_ON,
    SEASON_CALENDAR_DAY_PARAM
} from '@/config/constants/dfns'
import SeasonCalendarDayHeader from '@/features/Season/core/Calendar/DayHeader'
import SeasonCalendarGameItem from '@/features/Season/core/Calendar/GameItem'
import SeasonCalendarNoGames from '@/features/Season/core/Calendar/NoGames'
import SeasonCalendarTitleButton from '@/features/Season/core/Calendar/TitleButton'
import SeasonCalendarWeekNavButton, {
    SeasonCalendarWeekNavDirection
} from '@/features/Season/core/Calendar/WeekNavButton'
import SeasonCalendarWeekSelectSheet from '@/features/Season/core/Calendar/WeekSelectSheet'
import {
    SeasonCalendarScreen_GameFragment,
    useSeasonCalendarScreen_GamesQuery
} from '@/generated'
import { RootStackRoute } from '@/navigation/navigators/Root/Stack'
import { RootStackScreenProps } from '@/navigation/screenProps'
import GameCreateFAB from '@/features/Season/core/Calendar/GameCreateFAB'

export type SeasonCalendarScreenProps =
    RootStackScreenProps<RootStackRoute.SeasonCalendar>

function parseDayParam(day?: Date) {
    if (!day) return new Date()

    return isValid(day) ? day : new Date()
}

function binGamesByDay(games: SeasonCalendarScreen_GameFragment[]) {
    return [1, 2, 3, 4, 5, 6, 0].map((nDay) =>
        games.filter((game) => getDay(new Date(game.startTime)) === nDay)
    )
}

export default function SeasonCalendarScreen({
    navigation,
    route
}: SeasonCalendarScreenProps) {
    const {
        params: { seasonId, day }
    } = route

    const { navigate, setOptions } = navigation

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

    const isFocused = useIsFocused()

    // TODO(Victor): avoid using linkTo to alter url path
    const linkTo = useLinkTo()
    const setSelectedWeek = (week: Date) => {
        const newDay = format(week, SEASON_CALENDAR_DAY_PARAM)
        linkTo(`/season/${seasonId}/calendar/${newDay}`)
    }

    const weekSelectSheetDisclose = useDisclose()

    const weekGames = data?.season?.games || []

    const binnedWeekGames = binGamesByDay(weekGames)

    useEffect(() => {
        setOptions({
            headerRight: () => (
                <Box mr={4}>
                    <HStack alignItems="center" space={1}>
                        <SeasonCalendarTitleButton
                            onPress={() => {
                                weekSelectSheetDisclose.onOpen()
                            }}
                            selectedWeek={selectedWeek}
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
                {weekGames.length > 0 &&
                    binnedWeekGames.map((dayGames, index) => {
                        addDays(selectedWeek, index)
                        if (!dayGames.length) return null
                        return (
                            // eslint-disable-next-line react/no-array-index-key
                            <HStack key={index}>
                                <SeasonCalendarDayHeader
                                    alignSelf="flex-start"
                                    date={addDays(selectedWeek, index)}
                                    pt={1}
                                />
                                <VStack flex={1} space={1}>
                                    {dayGames.map((game) => (
                                        <SeasonCalendarGameItem
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
                                    ))}
                                </VStack>
                            </HStack>
                        )
                    })}
                {weekGames.length === 0 && <SeasonCalendarNoGames mt={5} />}
            </VStack>
            <SeasonCalendarWeekSelectSheet
                {...weekSelectSheetDisclose}
                onWeekSelect={(week) => {
                    weekSelectSheetDisclose.onClose()
                    setTimeout(() => setSelectedWeek(week), 500)
                }}
                selectedWeek={selectedWeek}
            />
            {isFocused && (
                <GameCreateFAB
                    onPress={() => {
                        navigate(RootStackRoute.SeasonGameNew, {
                            seasonId
                        })
                    }}
                />
            )}
        </ScreenContainer>
    )
}
