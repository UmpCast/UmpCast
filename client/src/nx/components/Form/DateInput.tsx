import DateTimePicker from '@react-native-community/datetimepicker'
import { format, getHours, getMinutes } from 'date-fns'
import { Box, HStack, Text } from 'native-base'
import { useState } from 'react'

import PressableX from '@/nx/components/PressableX'

import { useFieldContext } from './FieldContext'

interface Props {
    withTime?: boolean
}

interface TimeButtonProps {
    date: string
    onPress: () => void
}

function TimeButton({ date, onPress }: TimeButtonProps) {
    return (
        <PressableX onPress={onPress} rounded="sm" size="xs" variant="primary.solid">
            <Text color="white">{date}</Text>
        </PressableX>
    )
}

function mergeDateTime(date: Date, time: Date) {
    const hours = getHours(time)
    const minutes = getMinutes(time)

    date.setHours(hours)
    date.setMinutes(minutes)

    return date
}

export default function DateInput({ withTime = true }: Props) {
    const { field } = useFieldContext()

    const [showDate, setShowDate] = useState(false)
    const [showTime, setShowTime] = useState(false)

    const onDateButtonPress = () => {
        setShowDate(true)
    }

    const onTimeButtonPress = () => {
        setShowTime(true)
    }

    const { onChange, value } = field

    const formattedDate = format(value, 'MMM d yyyy')

    const formattedTime = format(value, 'h:mm aa')

    return (
        <Box bg="secondary.100" p={1.5} rounded="sm">
            <HStack alignItems="center" justifyContent="space-between" p={1}>
                <TimeButton date={formattedDate} onPress={onDateButtonPress} />
                {withTime && <TimeButton date={formattedTime} onPress={onTimeButtonPress} />}
            </HStack>
            {showDate && (
                <DateTimePicker
                    mode="date"
                    onChange={({ nativeEvent }: any) => {
                        setShowDate(false)

                        const { timestamp } = nativeEvent

                        if (timestamp) {
                            const newValue = mergeDateTime(timestamp as Date, value)
                            onChange(newValue)
                        }
                    }}
                    value={value}
                />
            )}
            {showTime && (
                <DateTimePicker
                    mode="time"
                    onChange={({ nativeEvent }: any) => {
                        setShowTime(false)

                        const { timestamp } = nativeEvent

                        if (timestamp) {
                            const newValue = mergeDateTime(value, timestamp as Date)
                            onChange(newValue)
                        }
                    }}
                    value={value}
                />
            )}
        </Box>
    )
}
