import { Feather } from '@expo/vector-icons'
import { IButtonProps, Icon, Button, Box } from 'native-base'

import { buildID, TestID, IconID } from '@/testing/testID'

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
            borderRadius={100}
            colorScheme="indigo"
            p={1.5}
            variant="ghost"
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
                    as={Feather}
                    color="indigo.600"
                    name={isNext ? 'chevron-right' : 'chevron-left'}
                />
            </Box>
        </Button>
    )
}
