import React from 'react'

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
            name={name}
            control={control}
            render={(props) => (
                <FormControl
                    isInvalid={props.fieldState.invalid}
                    isRequired={isRequired}
                >
                    {render(props)}
                </FormControl>
            )}
        />
    )
}