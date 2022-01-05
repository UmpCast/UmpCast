import { appVar } from '@/apollo/appCache'
import { useGetMyIdLazyQuery, AuthState } from '@/apollo/generated'
import { useEffect } from 'react'

export default function useAssertRegistered() {
    const [getMyId, { data }] = useGetMyIdLazyQuery()

    useEffect(() => {
        if (appVar.authState() !== AuthState.Unauthenticated) return

        const newAuthState = data?.me
            ? AuthState.Authenticated
            : AuthState.Unregistered

        appVar.authState(newAuthState)
    }, [data])

    const assertRegistered = getMyId

    return assertRegistered
}
