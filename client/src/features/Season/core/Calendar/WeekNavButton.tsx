import { buildID, TestID, IconID } from '@/testing/testID'
import { Feather } from '@expo/vector-icons'
import { IButtonProps, Icon, Button, Box } from 'native-base'

export enum SeasonCalendarWeekNavDirection {
    LAST = 'LAST',
    NEXT = 'NEXT'
}

export interface SeasonCalendarWeekNavButtonProps extends IButtonProps {
    direction: SeasonCalendarWeekNavDirection
}

export default function SeasonCalendarWeekNavButton({
    direction,
    ...rest
}: SeasonCalendarWeekNavButtonProps) {
    const isNext = direction === SeasonCalendarWeekNavDirection.NEXT

    return (
        <Button
            variant="ghost"
            colorScheme="indigo"
            p={1.5}
            borderRadius={100}
            {...rest}
        >
            <Box
                testID={buildID(
                    TestID.ICON,
                    isNext
                        ? IconID.CALENDAR_NEXT_WEEK
                        : IconID.CALENDAR_LAST_WEEK
                )}
            >
                <Icon
                    name={isNext ? 'chevron-right' : 'chevron-left'}
                    color="indigo.600"
                    as={Feather}
                />
            </Box>
        </Button>
    )
}
