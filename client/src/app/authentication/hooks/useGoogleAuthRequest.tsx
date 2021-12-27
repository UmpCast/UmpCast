import React from 'react'
import {
    getAuth,
    GoogleAuthProvider,
    signInWithCredential
} from 'firebase/auth'
import * as Google from 'expo-auth-session/providers/google'
import { makeRedirectUri } from 'expo-auth-session'
import { Platform } from 'react-native'
import { loadAppExtra } from '@/app/common/utils/appExtra'

export default function useGoogleAuthRequest() {
    const useProxy =
        loadAppExtra().NODE_ENV === 'development' && Platform.OS !== 'web'

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
            console.log(response)
            const { id_token: idToken } = response.params

            const auth = getAuth()
            const credential = GoogleAuthProvider.credential(idToken)
            signInWithCredential(auth, credential).then(console.log)
        }
    }, [response])

    return {
        request,
        promptAsync: () => promptAsync()
    }
}
