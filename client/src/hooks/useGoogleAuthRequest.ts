import React, { useCallback } from 'react'
import {
    getAuth,
    GoogleAuthProvider,
    signInWithCredential
} from 'firebase/auth'
import * as Google from 'expo-auth-session/providers/google'
import { makeRedirectUri } from 'expo-auth-session'
import { getPlatform } from '@/utils/native'
import useAssertRegistered from './useAssertRegistered'
import { loadAppExtra } from '@/utils/extra'
import { AuthRequestResult } from '@/utils/types'

export const signInFirebaseWithGoogle = (idToken: string) => {
    const auth = getAuth()
    const credential = GoogleAuthProvider.credential(idToken)
    return signInWithCredential(auth, credential)
}

export default function useGoogleAuthRequest(): AuthRequestResult {
    const useProxy = getPlatform().OS !== 'web'
    const assertRegistered = useAssertRegistered()

    const [request, response, promptAsync] = Google.useIdTokenAuthRequest(
        {
            clientId: loadAppExtra().GOOGLE_CLIENT_ID,
            redirectUri: makeRedirectUri({
                useProxy
            })
        },
        {
            useProxy
        }
    )

    const signInAppWithGoogle = useCallback(
        async (idToken: string) => {
            await signInFirebaseWithGoogle(idToken)
            await assertRegistered()
        },
        [signInFirebaseWithGoogle, assertRegistered]
    )

    React.useEffect(() => {
        if (response?.type === 'success') {
            const { id_token: idToken } = response.params
            signInAppWithGoogle(idToken)
        }
    }, [response])

    return {
        prepared: request !== null,
        login: () => promptAsync()
    }
}
