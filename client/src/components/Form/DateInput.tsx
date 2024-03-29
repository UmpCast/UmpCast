import DateTimePicker from '@react-native-community/datetimepicker'
import { format, getHours, getMinutes } from 'date-fns'
import { Box, HStack, Text, Modal, useDisclose } from 'native-base'
import { useState } from 'react'

import { useFieldContext } from './FieldContext'
import { Platform } from 'react-native'
import TextPressable from '../TextPressable'

interface Props {
    withTime?: boolean
}

interface TimeButtonProps {
    date: string
    onPress: () => void
}

function TimeButton({ date, onPress }: TimeButtonProps) {
    return (
        <TextPressable onPress={onPress} size="sm" variant="secondary.solid">
            <Text color="white">{date}</Text>
        </TextPressable>
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

    const dateDisclose = useDisclose()
    const timeDisclose = useDisclose()

    const onDateButtonPress = () => {
        setShowDate(true)
    }

    const onTimeButtonPress = () => {
        setShowTime(true)
    }

    const { onChange, value } = field

    const formattedDate = format(value, 'MMM d yyyy')

    const formattedTime = format(value, 'h:mm aa')

    if (Platform.OS == 'android') {
        return (
            <Box bg="secondary.lite" p={1.5} rounded="sm">
                <HStack alignItems="center" p={1} space="sm">
                    <TimeButton
                        date={formattedDate}
                        onPress={onDateButtonPress}
                    />
                    {withTime && (
                        <TimeButton
                            date={formattedTime}
                            onPress={onTimeButtonPress}
                        />
                    )}
                </HStack>
                {showDate && (
                    <DateTimePicker
                        mode="date"
                        display="default"
                        onChange={({ nativeEvent }: any) => {
                            const { timestamp } = nativeEvent

                            if (timestamp) {
                                const newValue = mergeDateTime(
                                    new Date(timestamp),
                                    value
                                )
                                onChange(newValue)
                            }

                            setShowDate(false)
                        }}
                        value={value}
                    />
                )}
                {showTime && (
                    <DateTimePicker
                        mode="time"
                        display="default"
                        onChange={({ nativeEvent }: any) => {
                            const { timestamp } = nativeEvent

                            if (timestamp) {
                                const newValue = mergeDateTime(
                                    value,
                                    new Date(timestamp)
                                )
                                console.log('here')
                                onChange(newValue)
                            }

                            setShowTime(false)
                        }}
                        value={value}
                    />
                )}
            </Box>
        )
    }

    if (Platform.OS == 'ios') {
        return (
            <Box bg="secondary.lite" p={1.5} rounded="sm">
                <HStack alignItems="center" p={1} space="sm">
                    <TimeButton
                        date={formattedDate}
                        onPress={dateDisclose.onOpen}
                    />
                    {withTime && (
                        <TimeButton
                            date={formattedTime}
                            onPress={timeDisclose.onOpen}
                        />
                    )}
                </HStack>
                <Modal {...dateDisclose}>
                    <Modal.Content>
                        <DateTimePicker
                            mode="date"
                            display="inline"
                            onChange={({ nativeEvent }: any) => {
                                const { timestamp } = nativeEvent

                                if (timestamp) {
                                    const newValue = mergeDateTime(
                                        new Date(timestamp),
                                        value
                                    )
                                    onChange(newValue)
                                }
                            }}
                            value={value}
                        />
                    </Modal.Content>
                </Modal>
                <Modal {...timeDisclose}>
                    <Modal.Content>
                        <DateTimePicker
                            mode="time"
                            display="spinner"
                            onChange={({ nativeEvent }: any) => {
                                const { timestamp } = nativeEvent

                                if (timestamp) {
                                    const newValue = mergeDateTime(
                                        value,
                                        new Date(timestamp)
                                    )
                                    onChange(newValue)
                                }
                            }}
                            value={value}
                        />
                    </Modal.Content>
                </Modal>
            </Box>
        )
    }

    return null
}
