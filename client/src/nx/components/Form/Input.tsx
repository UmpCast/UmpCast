import { IInputProps, Input as NBInput } from 'native-base'
import { useContext } from 'react'

import { FieldContext } from './FieldContext'

export interface InputProps extends IInputProps {}

export default function Input(props: InputProps) {
    const { field } = useContext(FieldContext)

    return (
        <NBInput
            _focus={{
                borderWidth: 0.5,
                borderColor: 'primary.600'
            }}
            _invalid={{
                borderWidth: 0.5,
                borderColor: 'danger.400'
            }}
            backgroundColor="secondary.100"
            borderWidth={0}
            focusOutlineColor="primary.600"
            invalidOutlineColor="danger.400"
            onBlur={field.onBlur}
            onChangeText={field.onChange}
            p={3}
            placeholderTextColor="secondary.400"
            rounded="sm"
            size="lg"
            value={field.value ?? ''}
            {...props}
        />
    )
}
