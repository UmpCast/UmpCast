import { AuthState, useGetAuthStateQuery } from '@/app/generated-types'
import useAssertRegistered from '@/app/signin/hooks/useAssertRegistered'
import { getAuth } from 'firebase/auth'
import { useEffect } from 'react'
import { AppVar } from '../../app/utils/appCache'

export default function useIntializeAuthstate() {
    const { data } = useGetAuthStateQuery()
    const assertRegistered = useAssertRegistered()

    useEffect(() => {
        getAuth().onAuthStateChanged(async (user) => {
            if (data?.authState) return

            if (!user) {
                AppVar.authState(AuthState.Unauthenticated)
                return
            }

            await assertRegistered()
        })
    }, [])

    return data?.authState
}
