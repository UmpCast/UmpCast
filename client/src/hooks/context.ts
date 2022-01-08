import { createContext } from 'react'

import { AuthPhase } from '@/models/authentication'

export const UpdateAuthContext = createContext<
    (phase: AuthPhase | undefined) => void
>(() => {})
