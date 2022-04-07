import SeasonCalendarWeekNavButton, {
    SeasonCalendarWeekNavDirection
} from '@/features/Season/core/Calendar/WeekNavButton'
import { Feather } from '@expo/vector-icons'
import { addWeeks, format, getMonth, getYear } from 'date-fns'
import { HStack, Button, Text, Icon } from 'native-base'

function formatCalendarMonth(weekStart: Date) {
    const weekEnd = addWeeks(weekStart, 1)
    if (getMonth(weekStart) === getMonth(weekEnd)) {
        return `${format(weekStart, 'MMM yyyy')}`
    }

    if (getYear(weekStart) === getYear(weekEnd)) {
        return `${format(weekStart, 'MMM')} - ${format(weekEnd, 'MMM yyyy')}`
    }

    return `${format(weekStart, 'MMM yyyy')} - ${format(weekEnd, 'MMM yyyy')}`
}

export interface SeasonCalendarRightHeaderProps {
    weekStart: Date
    onWeekChange: (newWeekStart: Date) => void
}

export default function SeasonCalendarRightHeader({
    weekStart,
    onWeekChange
}: SeasonCalendarRightHeaderProps) {
    return (
        <HStack space={1} alignItems="center">
            <Button variant="ghost" size="sm" colorScheme="indigo">
                <HStack space={2} alignItems="center">
                    <Text
                        fontWeight="medium"
                        fontSize="md"
                        color="blueGray.600"
                    >
                        {formatCalendarMonth(weekStart)}
                    </Text>
                    <Icon name="calendar" as={Feather} />
                </HStack>
            </Button>
            <SeasonCalendarWeekNavButton
                direction={SeasonCalendarWeekNavDirection.LAST}
                onPress={() => {
                    onWeekChange(addWeeks(weekStart, -1))
                }}
            />
            <SeasonCalendarWeekNavButton
                direction={SeasonCalendarWeekNavDirection.NEXT}
                onPress={() => {
                    onWeekChange(addWeeks(weekStart, 1))
                }}
            />
        </HStack>
    )
}
