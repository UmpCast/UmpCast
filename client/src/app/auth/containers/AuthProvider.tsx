import { useGetMyInfoLazyQuery, useGetMyInfoQuery } from '@/app/generated-types'
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
    const [getMyInfo, { data }] = useGetMyInfoLazyQuery()

    useEffect(() => {
        return getAuth().onAuthStateChanged((user) => {
            if (!user) return setAuthState(AuthState.UNAUTHENTICATED)
            getMyInfo()
        })
    }, [])

    useEffect(() => {
        if (!data) return
        setAuthState(
            data?.me ? AuthState.AUTHENTICATED : AuthState.UNREGISTERED
        )
    }, [data?.me])

    if (!authState) return null

    return render(authState)
}
