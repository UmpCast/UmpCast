import { Box, IBoxProps, Text, VStack } from 'native-base'
import { format } from 'date-fns'

export interface SeasonCalendarDayHeaderProps extends IBoxProps {
    date: Date
}

export default function SeasonCalendarDayHeader({
    date,
    ...rest
}: SeasonCalendarDayHeaderProps) {
    return (
        <Box width="40px" {...rest}>
            <VStack space={0.5} alignItems="center" mr={1}>
                <Text fontWeight="medium">{format(date, 'EEE')}</Text>
                <Text>{format(date, 'd')}</Text>
            </VStack>
        </Box>
    )
}
