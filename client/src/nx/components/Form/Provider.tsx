import { ReactNode, useMemo } from 'react'
import { Control } from 'react-hook-form'

import { FormContext } from './FormContext'

interface Props {
    control: Control<any, any>
    children: ReactNode
}

export default function Provider({ children, control }: Props) {
    const value = useMemo(() => ({ control }), [control])

    return <FormContext.Provider value={value}>{children}</FormContext.Provider>
}
