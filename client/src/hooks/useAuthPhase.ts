import { getAuth } from 'firebase/auth'
import { useEffect, useState } from 'react'

import { AuthPhase } from '@/models/authentication'
import { useIsRegisteredQuery } from '@/generated'

export default function useAuthPhase() {
    const [authPhase, setAuthPhase] = useState<AuthPhase>()
    const [{ data }, isRegistered] = useIsRegisteredQuery({
        pause: true,
        requestPolicy: 'network-only'
    })

    useEffect(() => {
        getAuth().onAuthStateChanged((user) => {
            const userExists = user !== null
            if (!userExists) setAuthPhase(AuthPhase.UNAUTHENTICATED)
            else isRegistered()
        })
    }, [])

    useEffect(() => {
        if (data?.isRegistered == null) return
        setAuthPhase(
            data.isRegistered ? AuthPhase.AUTHENTICATED : AuthPhase.UNREGISTERED
        )
    }, [data])

    return authPhase
}
