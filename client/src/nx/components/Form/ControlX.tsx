import { FormControl as NBFormControl, IFormControlProps } from 'native-base'
import { ReactNode } from 'react'
import {
    ControllerProps as HFControllerProps,
    Controller as HFController,
    Control
} from 'react-hook-form'

import { FieldContext } from './FieldContext'

interface Props {
    control: Control<any, any>
    name: string
    children: ReactNode
}

export default function ControlX({ control, name, children }: Props) {
    return (
        <HFController
            control={control}
            name={name}
            render={(fieldProps) => {
                const { fieldState } = fieldProps
                return (
                    <FieldContext.Provider value={fieldProps}>
                        <NBFormControl isInvalid={fieldState.invalid}>{children}</NBFormControl>
                    </FieldContext.Provider>
                )
            }}
        />
    )
}
