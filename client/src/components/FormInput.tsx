import { IInputProps, Input as NBInput } from 'native-base'
import { useContext } from 'react'

import { FieldContext } from './FormFieldContext'

export interface InputProps extends IInputProps {}

export default function Input(props: InputProps) {
    const { field } = useContext(FieldContext)

    return (
        <NBInput
            onBlur={field.onBlur}
            onChangeText={field.onChange}
            testID={`${field.name}-input`}
            value={field.value}
            {...props}
        />
    )
}
