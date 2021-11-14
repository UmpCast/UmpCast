import React from 'react'

import { FormControl, Input, IInputProps } from 'native-base'
import { Controller, Control } from 'react-hook-form'

export interface ControlledInputProps extends IInputProps {
    name: string
    label?: string
    control: Control<any>
}

export default function ControlledInput({
    name,
    label,
    control,
    ...rest
}: ControlledInputProps) {
    return (
        <Controller
            name={name}
            control={control}
            render={({ field, fieldState }) => (
                <FormControl isInvalid={fieldState.invalid}>
                    {label ? (
                        <FormControl.Label>{label}</FormControl.Label>
                    ) : null}
                    <Input
                        {...rest}
                        onChangeText={field.onChange}
                        value={field.value}
                    />
                    <FormControl.ErrorMessage>
                        {fieldState.error}
                    </FormControl.ErrorMessage>
                </FormControl>
            )}
        />
    )
}
