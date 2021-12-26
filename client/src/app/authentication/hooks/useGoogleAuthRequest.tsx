import React from 'react'
import {
    getAuth,
    GoogleAuthProvider,
    signInWithCredential
} from 'firebase/auth'
import { Platform } from 'react-native'

import * as Google from 'expo-auth-session/providers/google'
import { loadAppExtra } from '@/app/common/utils/appBuild'

export default function useGoogleAuthRequest() {
    const useProxy = Platform.OS !== 'web'

    const [request, response, promptAsync] = Google.useIdTokenAuthRequest(
        loadAppExtra().GOOGLE_AUTH_CONFIG,
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

    return { request, promptAsync }
}
