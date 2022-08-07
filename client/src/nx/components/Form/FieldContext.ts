import React from 'react'
import {
    ControllerRenderProps,
    ControllerFieldState,
    UseFormStateReturn
} from 'react-hook-form'

type FieldProp = {
    field: ControllerRenderProps
    fieldState: ControllerFieldState
    formState: UseFormStateReturn<any>
}

// @ts-ignore
export const FieldContext = React.createContext<FieldProp>(null)
