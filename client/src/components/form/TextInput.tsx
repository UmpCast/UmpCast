import React from 'react'

import { Input } from 'native-base'
import { Controller, Control, UseControllerProps } from 'react-hook-form'

interface Props extends UseControllerProps {
    control: Control
    name: string
}

export default function TextInput(props: Props) {
    const { control, name } = props

    return (
        <Controller
            control={control}
            name={name}
            render={({ field: { onChange, onBlur, value } }) => (
                <Input
                    onBlur={onBlur}
                    placeholder="John"
                    onChangeText={(val) => onChange(val)}
                    value={value}
                />
            )}
        />
    )
}
