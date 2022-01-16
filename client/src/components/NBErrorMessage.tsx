import { IFormControlErrorMessageProps, FormControl } from 'native-base'
import { ControllerRenderProps, ControllerFieldState } from 'react-hook-form'

export interface NBErrorMessageProps extends IFormControlErrorMessageProps {
    field: ControllerRenderProps<any, any>
    fieldState: ControllerFieldState
}

export default function NBErrorMessage({
    field,
    fieldState
}: NBErrorMessageProps) {
    return (
        <FormControl.ErrorMessage testID={`${field.name}-error`}>
            {fieldState.error?.message}
        </FormControl.ErrorMessage>
    )
}
