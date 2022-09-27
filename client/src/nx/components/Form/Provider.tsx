import { FormContext } from './FormContext'
import { Control } from 'react-hook-form'
import { ReactNode } from 'react'

interface Props {
    control: Control<any, any>
    children: ReactNode
}

export default function Provider({ children, control }: Props) {
    return <FormContext.Provider value={{ control }}>{children}</FormContext.Provider>
}
