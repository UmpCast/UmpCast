import {
    Input,
    IInputProps,
    IFormControlErrorMessageProps,
    FormControl
} from 'native-base'
import { ControllerFieldState, ControllerRenderProps } from 'react-hook-form'

export interface NBTextInputProps extends IInputProps {
    field: ControllerRenderProps<any, any>
}

export function NBTextInput({ field, ...rest }: NBTextInputProps) {
    return (
        <Input
            testID={`${field.name}-input`}
            onChangeText={field.onChange}
            value={field.value}
            {...rest}
        />
    )
}

export interface NBFormErrorProps extends IFormControlErrorMessageProps {
    field: ControllerRenderProps<any, any>
    fieldState: ControllerFieldState
}

export function NBFormError({ field, fieldState }: NBFormErrorProps) {
    return (
        <FormControl.ErrorMessage testID={`${field.name}-error`}>
            {fieldState.error?.message}
        </FormControl.ErrorMessage>
    )
}
