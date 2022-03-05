import { IFormControlErrorMessageProps, FormControl } from 'native-base'
import { ControllerRenderProps, ControllerFieldState } from 'react-hook-form'

export interface HFErrorMessageProps extends IFormControlErrorMessageProps {
    field: ControllerRenderProps<any, any>
    fieldState: ControllerFieldState
}

export default function HFErrorMessage({
    field,
    fieldState
}: HFErrorMessageProps) {
    return (
        <FormControl.ErrorMessage testID={`${field.name}-error`}>
            {fieldState.error?.message}
        </FormControl.ErrorMessage>
    )
}
