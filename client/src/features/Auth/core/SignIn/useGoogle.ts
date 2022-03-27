import { makeRedirectUri } from 'expo-auth-session'
import * as Google from 'expo-auth-session/providers/google'
import { getAuth, GoogleAuthProvider, LoginWithCredential } from 'firebase/auth'
import React from 'react'

import { loadAppExtra } from '@/utils/expo'
import { getPlatform } from '@/utils/native'
import { AuthLoginReturn } from '../../types'

export const LoginFirebaseWithGoogle = (idToken: string) => {
    const auth = getAuth()
    const credential = GoogleAuthProvider.credential(idToken)
    return LoginWithCredential(auth, credential)
}

export default function useAuthLoginGoogle(): AuthLoginReturn {
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
            LoginFirebaseWithGoogle(idToken)
        }
    }, [response])

    return {
        prepared: request !== null,
        Login: () => promptAsync()
    }
}
