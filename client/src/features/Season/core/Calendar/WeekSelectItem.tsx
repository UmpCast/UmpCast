import { format } from 'date-fns'
import { Actionsheet, IActionsheetItemProps, Text } from 'native-base'

export interface SeasonCalendarWeekSelectItemProps
    extends IActionsheetItemProps {
    week: Date
    selected: boolean
}

function formatWeek(weekStart: Date) {
    return format(weekStart, 'MMM dd yyyy')
}

export default function SeasonCalendarWeekSelectItem({
    week,
    selected,
    ...rest
}: SeasonCalendarWeekSelectItemProps) {
    return (
        <Actionsheet.Item
            py={2}
            {...rest}
            _pressed={{ bgColor: 'blueGray.200' }}
            disabled={selected}
        >
            <Text
                color={selected ? 'indigo.600' : 'blueGray.600'}
                fontSize="md"
                fontWeight="medium"
            >
                {formatWeek(week)}
            </Text>
        </Actionsheet.Item>
    )
}
