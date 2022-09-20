import { ResponseType } from 'expo-auth-session'
import * as facebook from 'expo-auth-session/providers/facebook'
import * as expoFacebook from 'expo-facebook'
import { getAuth, FacebookAuthProvider, signInWithCredential } from 'firebase/auth'
import { useCallback, useEffect } from 'react'

import { loadAppExtra } from '@/utils/expo'
import { getPlatform } from '@/utils/native'

import { AuthLoginReturn } from '../../types'

export const LoginFacebookNative = async () => {
    await expoFacebook.initializeAsync({
        appId: loadAppExtra().FACEBOOK_CLIENT_ID
    })
    return expoFacebook.logInWithReadPermissionsAsync({
        permissions: ['email', 'public_profile']
    })
}

export const LoginFirebaseWithFB = async (accessToken: string) => {
    const auth = getAuth()
    const credential = FacebookAuthProvider.credential(accessToken)
    return signInWithCredential(auth, credential)
}

export default function useAuthLoginFacebook(): AuthLoginReturn {
    const platform = getPlatform().OS
    const isWeb = platform === 'web'

    const [request, response, promptAsync] = facebook.useAuthRequest({
        responseType: ResponseType.Token,
        clientId: loadAppExtra().FACEBOOK_CLIENT_ID
    })

    useEffect(() => {
        if (response?.type !== 'success') return

        const { access_token: accessToken } = response.params
        LoginFirebaseWithFB(accessToken)
    }, [response])

    const LoginFacebook = useCallback(async () => {
        if (isWeb) {
            promptAsync()
            return
        }

        const nativeResponse = await LoginFacebookNative()
        if (nativeResponse.type !== 'success') return
        LoginFirebaseWithFB(nativeResponse.token)
    }, [isWeb, promptAsync, LoginFacebookNative, LoginFirebaseWithFB])

    return { prepared: request !== null, Login: LoginFacebook }
}
