import { IInputProps } from 'native-base'
import { useContext } from 'react'

import { FieldContext } from './FieldContext'
import UncontrolledInput from './UncontrolledInput'

export type InputProps = IInputProps

export default function Input(props: InputProps) {
    const { field } = useContext(FieldContext)

    return (
        <UncontrolledInput
            onBlur={field.onBlur}
            onChangeText={field.onChange}
            value={field.value ?? ''}
            {...props}
        />
    )
}
