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
import useAssertRegistered from './useAssertRegistered'

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

    const signInAppWithGoogle = async (idToken: string) => {
        await signInFirebaseWithGoogle(idToken)
        await assertRegistered()
    }

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
