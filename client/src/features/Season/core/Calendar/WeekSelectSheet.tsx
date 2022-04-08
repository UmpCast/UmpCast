import { WEEK_STARTS_ON } from '@/config/constants/dfns'
import { buildID, TestID } from '@/testing/testID'
import { isEqual, startOfWeek, addWeeks, addYears, isAfter } from 'date-fns'
import {
    Actionsheet,
    Button,
    FlatList,
    IActionsheetProps,
    VStack
} from 'native-base'
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

    //TODO(Victor): avoid using width 100%
    return (
        <Actionsheet
            testID={buildID(TestID.COMPONENT, 'SeasonCalendarWeekSelectSheet')}
            {...rest}
        >
            <Actionsheet.Content>
                <Button
                    variant="outline"
                    colorScheme="indigo"
                    size="sm"
                    mr={3}
                    mt={1}
                    py={1}
                    alignSelf="flex-end"
                    position="absolute"
                    onPress={() => {
                        onWeekSelect(thisWeek)
                    }}
                >
                    This Week
                </Button>
                <FlatList
                    width="100%"
                    data={weeks}
                    renderItem={({ item: week }) => {
                        return (
                            <SeasonCalendarWeekSelectItem
                                week={week}
                                selected={isEqual(week, selectedWeek)}
                                onPress={() => {
                                    onWeekSelect(week)
                                }}
                                key={String(week)}
                            />
                        )
                    }}
                    initialScrollIndex={initialIndex}
                />
            </Actionsheet.Content>
        </Actionsheet>
    )
}
