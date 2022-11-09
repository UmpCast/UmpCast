import Form from '@/components/Form'
import { useForm } from 'react-hook-form'
import DateTimePicker from '@react-native-community/datetimepicker'

export function DateInputTest() {
    const { control } = useForm({
        defaultValues: {
            startTime: new Date()
        }
    })
    return (
        <Form.Control
            control={control}
            name="startTime"
            render={() => (
                <Form.Group label={<Form.Label>Start Time</Form.Label>}>
                    <Form.DateInput />
                </Form.Group>
            )}
        />
    )
}

export function DatePickerTest() {
    return (
        <DateTimePicker
            mode="date"
            display="inline"
            onChange={() => {}}
            value={new Date()}
        />
    )
}