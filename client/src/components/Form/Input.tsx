import { ComponentID } from '@/testing/testID'
import { IInputProps, Input as NBInput } from 'native-base'
import { useContext } from 'react'

import { FieldContext } from './FieldContext'

export interface InputProps extends IInputProps {}

export default function Input(props: InputProps) {
    const { field } = useContext(FieldContext)

    return (
        <NBInput
            onBlur={field.onBlur}
            onChangeText={field.onChange}
            testID={`${ComponentID.FORM_INPUT}:${field.name}`}
            value={field.value}
            {...props}
        />
    )
}
