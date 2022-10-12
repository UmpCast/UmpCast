import { createContext, useContext } from 'react'

type AuthContextValue = {
    signOut: () => void
}

export const AuthContext = createContext<AuthContextValue>({} as any)

export function useAuth() {
    return useContext(AuthContext)
}
