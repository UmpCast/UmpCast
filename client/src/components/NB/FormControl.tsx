import { FormControl, IInputProps } from 'native-base'
import { Controller, ControllerProps } from 'react-hook-form'

export interface NBFormControlProps
    extends Omit<IInputProps, 'defaultValue'>,
        ControllerProps<any, any> {}

export default function NBFormControl({
    name,
    control,
    render,
    isRequired
}: NBFormControlProps) {
    return (
        <Controller
            control={control}
            name={name}
            render={(props) => (
                <FormControl
                    isInvalid={props.fieldState.invalid}
                    isRequired={isRequired}
                    testID={`${name}-control`}
                >
                    {render(props)}
                </FormControl>
            )}
        />
    )
}
