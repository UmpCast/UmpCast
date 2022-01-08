import { makeRedirectUri } from 'expo-auth-session'
import * as Google from 'expo-auth-session/providers/google'
import {
    getAuth,
    GoogleAuthProvider,
    signInWithCredential
} from 'firebase/auth'
import React, { useCallback } from 'react'

import { getPlatform } from '@/utils/native'
import { loadAppExtra } from '@/utils/expo'
import { AuthRequestResult } from './types'

export const signInFirebaseWithGoogle = (idToken: string) => {
    const auth = getAuth()
    const credential = GoogleAuthProvider.credential(idToken)
    return signInWithCredential(auth, credential)
}

export default function useGoogleAuthRequest(): AuthRequestResult {
    const useProxy = getPlatform().OS !== 'web'

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

    React.useEffect(() => {
        if (response?.type === 'success') {
            const { id_token: idToken } = response.params
            signInFirebaseWithGoogle(idToken)
        }
    }, [response])

    return {
        prepared: request !== null,
        login: () => promptAsync()
    }
}
