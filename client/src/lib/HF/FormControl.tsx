import { FormControl, IFormControlProps, IInputProps } from 'native-base'
import { ControllerFieldState, ControllerRenderProps } from 'react-hook-form'

export interface HFFormControlProps extends IFormControlProps {
    field: ControllerRenderProps
    fieldState: ControllerFieldState
}

export default function NBFormControl({
    field,
    fieldState,
    ...rest
}: HFFormControlProps) {
    return (
        <FormControl
            isInvalid={fieldState.invalid}
            testID={`${field.name}-control`}
            {...rest}
        />
    )
}
