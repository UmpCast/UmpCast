import { ResponseType } from 'expo-auth-session'
import * as Facebook from 'expo-auth-session/providers/facebook'
import * as FacebookNative from 'expo-facebook'
import {
    getAuth,
    FacebookAuthProvider,
    signInWithCredential
} from 'firebase/auth'
import { useCallback, useEffect } from 'react'

import { getPlatform } from '@/utils/native'
import { AuthRequestResult } from './types'
import { loadAppExtra } from '@/utils/expo'

export const signInFacebookNative = async () => {
    await FacebookNative.initializeAsync({
        appId: loadAppExtra().FACEBOOK_CLIENT_ID
    })
    return FacebookNative.logInWithReadPermissionsAsync({
        permissions: ['email', 'public_profile']
    })
}

export const signInFirebaseWithFB = async (accessToken: string) => {
    const auth = getAuth()
    const credential = FacebookAuthProvider.credential(accessToken)
    return signInWithCredential(auth, credential)
}

export default function useFacebookAuthRequest(): AuthRequestResult {
    const platform = getPlatform().OS
    const isWeb = platform === 'web'

    const [request, response, promptAsync] = Facebook.useAuthRequest({
        responseType: ResponseType.Token,
        clientId: loadAppExtra().FACEBOOK_CLIENT_ID
    })

    useEffect(() => {
        if (response?.type !== 'success') return

        const { access_token: accessToken } = response.params
        signInFirebaseWithFB(accessToken)
    }, [response])

    const loginFacebook = useCallback(async () => {
        if (isWeb) {
            promptAsync()
            return
        }

        const response = await signInFacebookNative()
        if (response.type !== 'success') return
        signInFirebaseWithFB(response.token)
    }, [isWeb, promptAsync, signInFacebookNative, signInFirebaseWithFB])

    return { prepared: request !== null, login: loginFacebook }
}
