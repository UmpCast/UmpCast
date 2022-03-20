import { IInputProps, Input as NBInput } from 'native-base'
import { useContext } from 'react'

import { TestID } from '@/testing/testID'

import { FieldContext } from './FieldContext'

export interface InputProps extends IInputProps {}

export default function Input(props: InputProps) {
    const { field } = useContext(FieldContext)

    return (
        <NBInput
            onBlur={field.onBlur}
            onChangeText={field.onChange}
            testID={`${TestID.FORM_INPUT}:${field.name}`}
            value={field.value}
            {...props}
        />
    )
}
