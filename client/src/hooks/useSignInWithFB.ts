import { ResponseType } from 'expo-auth-session'
import * as Facebook from 'expo-auth-session/providers/facebook'
import * as FacebookNative from 'expo-facebook'
import {
    getAuth,
    FacebookAuthProvider,
    signInWithCredential
} from 'firebase/auth'
import { useCallback, useEffect } from 'react'

import { loadAppExtra } from '@/utils/expo'
import { getPlatform } from '@/utils/native'
import { SignInResult } from '@/types/hook'

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

export default function useSignInWithFB(): SignInResult {
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
