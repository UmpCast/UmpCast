import { makeRedirectUri } from 'expo-auth-session'
import * as Google from 'expo-auth-session/providers/google'
import { getAuth, GoogleAuthProvider, signInWithCredential } from 'firebase/auth'
import { useEffect } from 'react'

import { expoEnv } from '@/utils/expo'
import { Platform } from 'react-native'

export default function useGoogleSignIn() {
    const useProxy = Platform.OS !== 'web'

    const [request, response, promptAsync] = Google.useIdTokenAuthRequest(
        {
            clientId: expoEnv.GOOGLE_CLIENT_ID,
            redirectUri: makeRedirectUri({
                useProxy
            })
        },
        {
            useProxy
        }
    )

    useEffect(() => {
        if (response?.type !== 'success') {
            return
        }

        const auth = getAuth()

        const { id_token: idToken } = response.params
        const credential = GoogleAuthProvider.credential(idToken)

        signInWithCredential(auth, credential)
    }, [response])

    const signIn = () => {
        promptAsync()
    }

    const ready = request !== null

    return {
        ready,
        signIn
    }
}
