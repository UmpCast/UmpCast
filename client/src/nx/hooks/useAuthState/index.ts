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

    const [{ data }, refetch] = useBasicViewerInfoQuery({
        pause: !state.authenticated
    })

    const viewerId = data?.viewer?.id

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
            refetch()
        })
    }, [])

    useEffect(() => {
        setState({
            authenticated,
            registered: viewerId !== null
        })
    }, [viewerId])

    if (authenticated == null) {
        return AuthState.LOADING
    }
    if (!authenticated) {
        return AuthState.UNAUTHENTICATED
    }
    if (registered == null) {
        return AuthState.LOADING
    }
    if (!registered) {
        return AuthState.UNAUTHORIZED
    }
    return AuthState.AUTHORIZED
}
