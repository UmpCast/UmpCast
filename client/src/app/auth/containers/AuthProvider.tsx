import { getAuth } from 'firebase/auth'
import { useEffect, useState } from 'react'

export enum AuthState {
    UNAUTHENTICATED,
    UNREGISTERED,
    AUTHENTICATED
}

export interface AuthProviderProps {
    render: (state: AuthState) => JSX.Element
}

export default function AuthProvider({ render }: AuthProviderProps) {
    const [authState, setAuthState] = useState<AuthState | null>(null)

    useEffect(() => {
        getAuth().onAuthStateChanged((user) => {
            if (!user) return setAuthState(AuthState.UNAUTHENTICATED)
        })
    }, [])

    if (!authState) return null

    return render(authState)
}
