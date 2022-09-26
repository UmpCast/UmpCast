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
                borderColor: 'primary.solid'
            }}
            _invalid={{
                borderWidth: 0.5,
                borderColor: 'danger.solid'
            }}
            backgroundColor="secondary.lite"
            borderWidth={0}
            focusOutlineColor="primary.solid"
            invalidOutlineColor="danger.solid"
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
