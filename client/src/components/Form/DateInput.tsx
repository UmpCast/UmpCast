import DateTimePicker from '@react-native-community/datetimepicker'
import { format, getHours, getMinutes } from 'date-fns'
import { Box, HStack, Text, Modal, useDisclose } from 'native-base'
import { useState } from 'react'

import AppPressable from '@/components/AppPressable'

import { useFieldContext } from './FieldContext'
import { Platform } from 'react-native'

interface Props {
    withTime?: boolean
}

interface TimeButtonProps {
    date: string
    onPress: () => void
}

function TimeButton({ date, onPress }: TimeButtonProps) {
    return (
        <AppPressable
            onPress={onPress}
            rounded="sm"
            size="xs"
            variant="secondary.solid"
        >
            <Text color="white">{date}</Text>
        </AppPressable>
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
            <Box bg="secondary.100" p={1.5} rounded="sm">
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
                            setShowDate(false)

                            const { timestamp } = nativeEvent

                            if (timestamp) {
                                const newValue = mergeDateTime(
                                    timestamp as Date,
                                    value
                                )
                                onChange(newValue)
                            }
                        }}
                        value={value}
                    />
                )}
                {showTime && (
                    <DateTimePicker
                        mode="time"
                        display="default"
                        onChange={({ nativeEvent }: any) => {
                            setShowTime(false)

                            const { timestamp } = nativeEvent

                            if (timestamp) {
                                const newValue = mergeDateTime(
                                    value,
                                    timestamp as Date
                                )
                                onChange(newValue)
                            }
                        }}
                        value={value}
                    />
                )}
            </Box>
        )
    }

    if (Platform.OS == 'ios') {
        return (
            <Box bg="secondary.100" p={1.5} rounded="sm">
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
