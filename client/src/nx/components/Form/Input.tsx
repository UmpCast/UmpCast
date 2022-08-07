import { IInputProps, Input as NBInput } from 'native-base'
import { useContext } from 'react'
import { FieldContext } from './FieldContext'
import { textBoxDefaultProps } from '../TextBox'

export interface InputProps extends IInputProps {}

export default function Input({ ...rest }: InputProps) {
    const { field } = useContext(FieldContext)

    return (
        <NBInput
            {...textBoxDefaultProps}
            borderWidth={0}
            onBlur={field.onBlur}
            onChangeText={field.onChange}
            invalidOutlineColor="danger.base"
            value={field.value ?? ''}
            {...rest}
        />
    )
}
