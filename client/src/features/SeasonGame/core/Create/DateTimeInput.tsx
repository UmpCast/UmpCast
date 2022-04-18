import { FieldContext } from '@/components/Form/FieldContext'
import { Box, HStack, Button } from 'native-base'
import { format, getHours, getMinutes, setHours, setMinutes } from 'date-fns'
import { useContext, useState } from 'react'
import DateTimePicker from '@react-native-community/datetimepicker'
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
                borderWidth={1}
                borderColor={fieldState.error ? 'red.600' : 'blueGray.200'}
                borderRadius={5}
                p={0.5}
            >
                <HStack justifyContent="space-between">
                    <Button
                        variant="ghost"
                        colorScheme="indigo"
                        onPress={() => setShowDate(true)}
                        py={1.5}
                    >
                        {format(value, 'MMM d yyyy')}
                    </Button>
                    <Button
                        variant="ghost"
                        colorScheme="indigo"
                        onPress={() => setShowTime(true)}
                        py={1.5}
                    >
                        {format(value, 'h:mm aa')}
                    </Button>
                </HStack>
            </Box>
            {showDate && (
                <DateTimePicker
                    testID={buildID(TestID.FORM_INPUT, name, 'date')}
                    value={value}
                    mode="date"
                    onChange={(_: any, date: any) => {
                        setShowDate(false)
                        onChange(mergeTime(date, value))
                    }}
                    minuteInterval={15}
                />
            )}
            {showTime && (
                <DateTimePicker
                    testID={buildID(TestID.FORM_INPUT, name, 'time')}
                    value={value}
                    mode="time"
                    onChange={(_: any, date: any) => {
                        setShowTime(false)
                        onChange(mergeTime(value, date as Date))
                    }}
                    minuteInterval={15}
                />
            )}
        </Box>
    )
}
