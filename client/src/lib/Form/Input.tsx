import { IInputProps, Input } from 'native-base'
import { useContext } from 'react'
import { FieldContext } from './FieldContext'

export interface InputProps extends IInputProps {}

export default function Input(props: InputProps) {
    const { field } = useContext(FieldContext)

    return (
        <Input
            onChangeText={field.onChange}
            onBlur={field.onBlur}
            value={field.value}
            testID={`${field.name}-input`}
            {...props}
        />
    )
}
