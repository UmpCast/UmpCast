import { ISelectProps, Select } from 'native-base'
import { useContext } from 'react'

import { buildID, TestID } from '@/testing/testID'

import { FieldContext } from './FieldContext'

export interface FormSelectProps extends ISelectProps {}

export default function FormSelect({ ...rest }: FormSelectProps) {
    const { field } = useContext(FieldContext)
    return (
        <Select
            onValueChange={field.onChange}
            selectedValue={field.value}
            testID={buildID(TestID.FORM_INPUT, field.name)}
            {...rest}
        />
    )
}
