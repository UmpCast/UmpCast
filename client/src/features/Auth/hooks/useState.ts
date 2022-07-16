import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { useEffect, useState } from 'react'

import { useAuthStateQuery } from '@/generated'

export default function useAuthState() {
    const [loading, setLoading] = useState(true)
    const [authenticated, setAuthenticated] = useState(false)
    const [registered, setRegistered] = useState(false)

    const [{ data, fetching }, refetch] = useAuthStateQuery({
        pause: true
    })

    useEffect(
        () =>
            onAuthStateChanged(getAuth(), (user) => {
                if (user === null) {
                    setAuthenticated(false)
                    setLoading(false)
                    return
                }

                setAuthenticated(true)
                setLoading(true)
                refetch()
            }),
        []
    )

    useEffect(() => {
        if (!authenticated || fetching) return
        setRegistered(data?.viewer?.id !== undefined)
        setLoading(false)
    }, [data])

    return { loading, authenticated, registered }
}
