import React from 'react'
import {
    getAuth,
    GoogleAuthProvider,
    signInWithCredential
} from 'firebase/auth'
import * as Google from 'expo-auth-session/providers/google'
import { makeRedirectUri } from 'expo-auth-session'
import { loadAppExtra } from '@/app/common/utils/appExtra'
import { AuthRequestResult } from './types'
import { getPlatform } from '@/app/common/utils/native'

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

            const auth = getAuth()
            const credential = GoogleAuthProvider.credential(idToken)
            signInWithCredential(auth, credential)
        }
    }, [response])

    return {
        prepared: request !== null,
        login: () => promptAsync()
    }
}
