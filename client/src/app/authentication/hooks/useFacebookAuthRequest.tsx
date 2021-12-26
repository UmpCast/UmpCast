import React from 'react'
import {
    getAuth,
    FacebookAuthProvider,
    signInWithCredential
} from 'firebase/auth'

import * as Facebook from 'expo-auth-session/providers/facebook'
import { loadAppExtra } from '@/app/common/utils/appBuild'

export default function useFacebookAuthRequest() {
    const [request, response, promptAsync] = Facebook.useAuthRequest(
        loadAppExtra().FACEBOOK_AUTH_CONFIG
    )

    React.useEffect(() => {
        if (response?.type === 'success') {
            const { access_token: accessToken } = response.params

            const auth = getAuth()
            const credential = FacebookAuthProvider.credential(accessToken)
            signInWithCredential(auth, credential)
        }
    }, [response])

    return { request, promptAsync }
}
