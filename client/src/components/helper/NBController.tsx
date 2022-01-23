import { FormControl, IInputProps } from 'native-base'
import { Controller, ControllerProps } from 'react-hook-form'

export interface NBControllerProps
    extends Omit<IInputProps, 'defaultValue'>,
        ControllerProps<any, any> {}

export default function NBController({
    name,
    control,
    render,
    isRequired
}: NBControllerProps) {
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
