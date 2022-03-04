import { FormControl, IFormControlProps } from 'native-base'
import { ControllerFieldState, ControllerRenderProps } from 'react-hook-form'

export interface HFFormControlProps extends IFormControlProps {
    field: ControllerRenderProps
    fieldState: ControllerFieldState
}

export default function HFFormControl({
    field,
    fieldState,
    ...rest
}: HFFormControlProps) {
    return (
        <FormControl
            isInvalid={fieldState.invalid}
            testID={`${field.name}-control`}
            flex={1}
            {...rest}
        />
    )
}
