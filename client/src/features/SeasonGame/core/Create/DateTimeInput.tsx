import DateTimePicker from '@react-native-community/datetimepicker'
import { format, getHours, getMinutes, setHours, setMinutes } from 'date-fns'
import { Box, HStack, Button } from 'native-base'
import { useContext, useState } from 'react'

import { FieldContext } from '@/blocks/Form/FieldContext'
import { buildID, TestID } from '@/testing/testID'

const mergeTime = (date: Date, time: Date) => {
    let newDate = date
    newDate = setHours(newDate, getHours(time))
    newDate = setMinutes(newDate, getMinutes(time))

    return newDate
}

export default function SeasonGameCreateDateTimeInput() {
    const {
        field: { value, onChange, name },
        fieldState
    } = useContext(FieldContext)

    const [showDate, setShowDate] = useState(false)
    const [showTime, setShowTime] = useState(false)

    return (
        <Box>
            <Box
                borderColor={fieldState.error ? 'red.600' : 'blueGray.200'}
                borderRadius={5}
                borderWidth={1}
                p={0.5}
            >
                <HStack justifyContent="space-between">
                    <Button
                        colorScheme="indigo"
                        onPress={() => setShowDate(true)}
                        py={1.5}
                        variant="ghost"
                    >
                        {format(value, 'MMM d yyyy')}
                    </Button>
                    <Button
                        colorScheme="indigo"
                        onPress={() => setShowTime(true)}
                        py={1.5}
                        variant="ghost"
                    >
                        {format(value, 'h:mm aa')}
                    </Button>
                </HStack>
            </Box>
            {showDate && (
                <DateTimePicker
                    minuteInterval={15}
                    mode="date"
                    onChange={(_: any, date: any) => {
                        setShowDate(false)
                        if (!date) {
                            return
                        }
                        onChange(mergeTime(date, value))
                    }}
                    testID={buildID(TestID.FORM_INPUT, name, 'date')}
                    value={value}
                />
            )}
            {showTime && (
                <DateTimePicker
                    minuteInterval={15}
                    mode="time"
                    onChange={(_: any, date: any) => {
                        setShowTime(false)

                        if (!date) {
                            return
                        }
                        onChange(mergeTime(value, date as Date))
                    }}
                    testID={buildID(TestID.FORM_INPUT, name, 'time')}
                    value={value}
                />
            )}
        </Box>
    )
}
