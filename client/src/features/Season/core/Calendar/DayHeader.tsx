import { format } from 'date-fns'
import { Box, IBoxProps, Text, VStack } from 'native-base'

export interface SeasonCalendarDayHeaderProps extends IBoxProps {
    date: Date
}

export default function SeasonCalendarDayHeader({
    date,
    ...rest
}: SeasonCalendarDayHeaderProps) {
    return (
        <Box width="40px" {...rest}>
            <VStack alignItems="center" mr={1} space={0.5}>
                <Text fontWeight="medium">{format(date, 'EEE')}</Text>
                <Text>{format(date, 'd')}</Text>
            </VStack>
        </Box>
    )
}
