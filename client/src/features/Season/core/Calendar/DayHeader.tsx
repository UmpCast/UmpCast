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
        <Box
            width="60px"
            py={1}
            borderRightWidth={2}
            borderColor={'blueGray.300'}
            {...rest}
        >
            <VStack space={0.5} alignItems="center" mr={1}>
                <Text>{format(date, 'EEE')}</Text>
                <Text>{format(date, 'd')}</Text>
            </VStack>
        </Box>
    )
}
