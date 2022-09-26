import { format } from 'date-fns'
import { Box, VStack, Text } from 'native-base'

interface Props {
    date: Date | null
}

export default function Date({ date }: Props) {
    return (
        <Box width="30px">
            {date && (
                <VStack alignItems="center">
                    <Text color="secondary.mute" fontSize="xs">
                        {format(date, 'EEE').toUpperCase()}
                    </Text>
                    <Text color="primary.solid" fontSize="lg">
                        {format(date, 'd')}
                    </Text>
                </VStack>
            )}
        </Box>
    )
}
