import { AuthPhase } from '@/models/authentication'
import { createContext } from 'react'

export const UpdateAuthContext = createContext<
    (phase: AuthPhase | undefined) => void
>(() => {})
