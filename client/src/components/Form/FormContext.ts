import React, { useContext } from 'react'
import { Control } from 'react-hook-form'

type FormProp = {
    control: Control<any, any>
}

// @ts-ignore
export const FormContext = React.createContext<FormProp>(null)

export function useFormContext() {
    return useContext(FormContext)
}
