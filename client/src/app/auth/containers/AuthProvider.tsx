import { getAuth } from 'firebase/auth'
import { useEffect, useState } from 'react'
import { useGetMyInfoLazyQuery } from '@/app/generated-types'

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

    useEffect(
        () =>
            getAuth().onAuthStateChanged((user) => {
                if (!user) {
                    setAuthState(AuthState.UNAUTHENTICATED)
                    return
                }
                getMyInfo()
            }),
        []
    )

    useEffect(() => {
        if (!data) return
        setAuthState(
            data?.me ? AuthState.AUTHENTICATED : AuthState.UNREGISTERED
        )
    }, [data?.me])

    if (!authState) return null

    return render(authState)
}
