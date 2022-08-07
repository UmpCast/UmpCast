import { isEqual, startOfWeek, addWeeks, addYears, isAfter } from 'date-fns'
import { Actionsheet, Button, FlatList, IActionsheetProps } from 'native-base'

import { WEEK_STARTS_ON } from '@/config/constants/dfns'
import { buildID, TestID } from '@/testing/testID'

import SeasonCalendarWeekSelectItem from './WeekSelectItem'

export interface SeasonCalendarWeekSelectSheetProps extends IActionsheetProps {
    selectedWeek: Date
    onWeekSelect: (week: Date) => void
}

function buildWeekRange(startDate: Date, endDate: Date) {
    const weeks = []
    let currentWeek = startOfWeek(startDate, {
        weekStartsOn: WEEK_STARTS_ON
    })
    if (!isEqual(currentWeek, startDate)) {
        currentWeek = addWeeks(currentWeek, 1)
    }

    while (!isAfter(currentWeek, endDate)) {
        weeks.push(currentWeek)
        currentWeek = addWeeks(currentWeek, 1)
    }

    return weeks
}

export default function SeasonCalendarWeekSelectSheet({
    selectedWeek,
    onWeekSelect,
    ...rest
}: SeasonCalendarWeekSelectSheetProps) {
    const now = new Date()
    const thisWeek = startOfWeek(now, {
        weekStartsOn: WEEK_STARTS_ON
    })
    const weeks = buildWeekRange(addYears(now, -1), addYears(now, 1))

    const initialIndex = weeks.findIndex((week) => isEqual(week, selectedWeek))

    // TODO(Victor): avoid using width 100%
    return (
        <Actionsheet
            testID={buildID(TestID.COMPONENT, 'SeasonCalendarWeekSelectSheet')}
            {...rest}
        >
            <Actionsheet.Content>
                <Button
                    alignSelf="flex-end"
                    colorScheme="indigo"
                    mr={3}
                    mt={1}
                    onPress={() => {
                        onWeekSelect(thisWeek)
                    }}
                    position="absolute"
                    py={1}
                    button="sm"
                    variant="outline"
                >
                    This Week
                </Button>
                <FlatList
                    data={weeks}
                    initialScrollIndex={initialIndex}
                    keyExtractor={(week: Date) => week.toISOString()}
                    renderItem={({ item: week }) => (
                        <SeasonCalendarWeekSelectItem
                            key={String(week)}
                            onPress={() => {
                                onWeekSelect(week)
                            }}
                            selected={isEqual(week, selectedWeek)}
                            week={week}
                        />
                    )}
                    width="100%"
                />
            </Actionsheet.Content>
        </Actionsheet>
    )
}
