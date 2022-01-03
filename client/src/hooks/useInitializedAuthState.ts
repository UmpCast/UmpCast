import { getAuth } from 'firebase/auth'
import { useEffect } from 'react'

import { appVar } from '@/apollo/appCache'
import { useGetAuthStateQuery, AuthState } from '@/apollo/generated'

import useAssertRegistered from './useAssertRegistered'

export default function useInitializedAuthState() {
    const { data } = useGetAuthStateQuery()
    const assertRegistered = useAssertRegistered()

    useEffect(() => {
        getAuth().onAuthStateChanged(async (user) => {
            if (data?.authState) return

            if (!user) {
                appVar.authState(AuthState.Unauthenticated)
                return
            }

            await assertRegistered()
        })
    }, [])

    return data?.authState
}
