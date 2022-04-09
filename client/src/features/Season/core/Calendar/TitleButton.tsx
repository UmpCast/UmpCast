import { Feather } from '@expo/vector-icons'
import { addWeeks, getMonth, getYear, format } from 'date-fns'
import { HStack, IButtonProps, Icon, Text, Button } from 'native-base'

export interface SeasonCalendarTitleButtonProps extends IButtonProps {
    selectedWeek: Date
}

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

export default function SeasonCalendarTitleButton({
    selectedWeek,
    ...rest
}: SeasonCalendarTitleButtonProps) {
    return (
        <Button colorScheme="indigo" size="sm" variant="ghost" {...rest}>
            <HStack alignItems="center" space={2}>
                <Text color="blueGray.600" fontSize="md" fontWeight="medium">
                    {formatCalendarMonth(selectedWeek)}
                </Text>
                <Icon as={Feather} name="calendar" />
            </HStack>
        </Button>
    )
}
