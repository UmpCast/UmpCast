import DateTimePicker from '@react-native-community/datetimepicker'
import { format } from 'date-fns'
import { Box, HStack } from 'native-base'
import { useState } from 'react'
import { useFieldContext } from './FieldContext'

interface Props {
    withTime?: boolean
}

export default function DateInput({ withTime }: Props) {
    const { field } = useFieldContext()

    const [showDate, setShowDate] = useState(false)
    const [showTime, setShowTime] = useState(false)

    const { onChange, value } = field

    const formattedDate = format(value, 'MMM d yyyy')

    const formattedTime = format(value, 'hh:mm')

    return (
        <Box bg="secondary.100" p={1} rounded="sm">
            <HStack justifyContent="space-between" alignItems="center"></HStack>
            {showDate && (
                <DateTimePicker
                    onChange={() => {
                        onChange
                    }}
                    value={value}
                />
            )}
            {showTime && (
                <DateTimePicker
                    onChange={() => {
                        onChange()
                    }}
                    value={value}
                />
            )}
        </Box>
    )
}
