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
                borderColor: 'primary.base'
            }}
            _invalid={{
                borderWidth: 0.5,
                borderColor: 'danger.base'
            }}
            backgroundColor="secondary.hover"
            borderWidth={0}
            focusOutlineColor="primary.base"
            invalidOutlineColor="danger.base"
            onBlur={field.onBlur}
            onChangeText={field.onChange}
            p={3}
            placeholderTextColor="secondary.mute"
            rounded="sm"
            size="lg"
            value={field.value ?? ''}
            {...props}
        />
    )
}
