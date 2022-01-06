import { AuthPhase } from '@/models/authentication'
import { useGetMyIdQuery } from '@/urql/generated'
import { getAuth } from 'firebase/auth'
import { useEffect, useState } from 'react'

export default function useAuthPhase(): AuthPhase | null {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)
    const [getMyIdResult] = useGetMyIdQuery()

    useEffect(
        () =>
            getAuth().onAuthStateChanged((user) => {
                setIsAuthenticated(user !== null)
            }),
        []
    )

    const userId = getMyIdResult.data?.me?.id

    if (isAuthenticated === null) return null
    else if (!isAuthenticated) return AuthPhase.UNAUTHENTICATED
    else if (!userId) return AuthPhase.UNREGISTERED
    else return AuthPhase.AUTHENTICATED
}
