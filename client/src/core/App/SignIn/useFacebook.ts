import { ResponseType } from 'expo-auth-session'
import * as facebook from 'expo-auth-session/providers/facebook'
import * as expoFacebook from 'expo-facebook'
import {
    getAuth,
    FacebookAuthProvider,
    signInWithCredential
} from 'firebase/auth'
import { useCallback, useEffect } from 'react'

import { loadAppExtra } from '@/utils/expo'
import { getPlatform } from '@/utils/native'
import { AppSignInReturn } from '../types'

export const signInFacebookNative = async () => {
    await expoFacebook.initializeAsync({
        appId: loadAppExtra().FACEBOOK_CLIENT_ID
    })
    return expoFacebook.logInWithReadPermissionsAsync({
        permissions: ['email', 'public_profile']
    })
}

export const signInFirebaseWithFB = async (accessToken: string) => {
    const auth = getAuth()
    const credential = FacebookAuthProvider.credential(accessToken)
    return signInWithCredential(auth, credential)
}

export default function useAuthSignInFacebook(): AppSignInReturn {
    const platform = getPlatform().OS
    const isWeb = platform === 'web'

    const [request, response, promptAsync] = facebook.useAuthRequest({
        responseType: ResponseType.Token,
        clientId: loadAppExtra().FACEBOOK_CLIENT_ID
    })

    useEffect(() => {
        if (response?.type !== 'success') return

        const { access_token: accessToken } = response.params
        signInFirebaseWithFB(accessToken)
    }, [response])

    const signInFacebook = useCallback(async () => {
        if (isWeb) {
            promptAsync()
            return
        }

        const nativeResponse = await signInFacebookNative()
        if (nativeResponse.type !== 'success') return
        signInFirebaseWithFB(nativeResponse.token)
    }, [isWeb, promptAsync, signInFacebookNative, signInFirebaseWithFB])

    return { prepared: request !== null, signIn: signInFacebook }
}
