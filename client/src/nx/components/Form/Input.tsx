import { IInputProps, Input as NBInput } from 'native-base'
import { useContext } from 'react'
import { FieldContext } from './FieldContext'

export interface InputProps extends IInputProps {}

export default function Input(props: InputProps) {
    const { field } = useContext(FieldContext)

    return (
        <NBInput
            placeholderTextColor="secondary.mute"
            focusOutlineColor="primary.base"
            _focus={{
                borderWidth: 0.5,
                borderColor: 'primary.base'
            }}
            _invalid={{
                borderWidth: 0.5,
                borderColor: 'danger.base'
            }}
            invalidOutlineColor="danger.base"
            backgroundColor="secondary.hover"
            borderWidth={0}
            p={3}
            rounded="sm"
            size="lg"
            onBlur={field.onBlur}
            onChangeText={field.onChange}
            value={field.value ?? ''}
            {...props}
        />
    )
}
