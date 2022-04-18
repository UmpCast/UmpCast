import { buildID, TestID } from '@/testing/testID'
import { ISelectProps, Select } from 'native-base'
import { useContext } from 'react'
import { FieldContext } from './FieldContext'

export interface FormSelectProps extends ISelectProps {}

export default function FormSelect({ ...rest }: FormSelectProps) {
    const { field } = useContext(FieldContext)
    return (
        <Select
            testID={buildID(TestID.FORM_INPUT, field.name)}
            selectedValue={field.value}
            onValueChange={field.onChange}
            {...rest}
        />
    )
}
