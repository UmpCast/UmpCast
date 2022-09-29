import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { useEffect, useState } from 'react'

import { useBasicViewerInfoQuery } from '../../graphql/queries/BasicViewerInfo.generated'

export enum AuthState {
    LOADING,
    UNAUTHENTICATED,
    UNAUTHORIZED,
    AUTHORIZED
}

type InternalAuthState = {
    authenticated: boolean | null
    registered: boolean | null
}

export default function useAuthState() {
    const [state, setState] = useState<InternalAuthState>({
        authenticated: null,
        registered: null
    })

    const { authenticated, registered } = state

    const [{ data }, refetch] = useBasicViewerInfoQuery()

    useEffect(() => {
        onAuthStateChanged(getAuth(), (user) => {
            if (user === null) {
                setState({
                    authenticated: false,
                    registered: false
                })
                return
            }

            setState({
                authenticated: true,
                registered: null
            })
            // must refetch to ensure new user's .getIdToken()
            // is associated with a registered account
            refetch()
        })
    }, [])

    useEffect(() => {
        const viewer = data?.viewer

        setState({
            authenticated,
            registered: viewer !== null
        })
    }, [data])

    if (authenticated === null) {
        return AuthState.LOADING
    }
    if (authenticated === false) {
        return AuthState.UNAUTHENTICATED
    }
    if (registered === null) {
        return AuthState.LOADING
    }
    if (registered === false) {
        return AuthState.UNAUTHORIZED
    }
    return AuthState.AUTHORIZED
}
