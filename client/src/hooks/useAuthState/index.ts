import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { useEffect, useState } from 'react'

import { useGetOrCreateUserMutation } from '../../graphql/mutations/GetOrCreateUser/index.generated'
import createMockClient from '@/mock/client'
import { Client } from 'urql'

export enum AuthState {
    LOADING,
    SIGNED_IN,
    SIGNED_OUT
}

interface Props {
    createClient: () => Client
}

export default function useAuthState({ createClient }: Props) {
    const [client, setClient] = useState(createMockClient)
    const [, getOrCreateUser] = useGetOrCreateUserMutation()

    const [authState, setAuthState] = useState(AuthState.LOADING)

    const signIn = async () => {
        const { data } = await getOrCreateUser()

        const success = data?.getOrCreateUser.success

        if (success) {
            setAuthState(AuthState.SIGNED_IN)
            return true
        }

        return false
    }

    const signOut = async () => {
        setAuthState(AuthState.SIGNED_OUT)

        const newClient = createClient()
        setClient(newClient)

        await getAuth().signOut()
    }

    return {
        authState,
        signIn,
        signOut,
        client
    }
}
