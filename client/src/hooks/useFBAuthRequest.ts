import { useCallback, useEffect } from 'react'
import {
    getAuth,
    FacebookAuthProvider,
    signInWithCredential
} from 'firebase/auth'
import * as FacebookNative from 'expo-facebook'
import * as Facebook from 'expo-auth-session/providers/facebook'
import { ResponseType } from 'expo-auth-session'
import { getPlatform } from '@/utils/native'
import useAssertRegistered from './useAssertRegistered'
import { loadAppExtra } from '@/utils/extra'
import { AuthRequestResult } from '@/utils/types'

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
    const isWeb = getPlatform().OS === 'web'

    const [request, response, promptAsync] = Facebook.useAuthRequest({
        responseType: ResponseType.Token,
        clientId: loadAppExtra().FACEBOOK_CLIENT_ID
    })

    const assertRegistered = useAssertRegistered()
    const signInAppWithFB = useCallback(
        async (accessToken: string) => {
            await signInFirebaseWithFB(accessToken)
            await assertRegistered()
        },
        [signInFirebaseWithFB, assertRegistered]
    )

    useEffect(() => {
        if (response?.type !== 'success') return

        const { access_token: accessToken } = response.params
        signInAppWithFB(accessToken)
    }, [response])

    const loginFacebook = useCallback(async () => {
        if (isWeb) {
            promptAsync()
            return
        }

        const res = await signInFacebookNative()
        if (res.type !== 'success') return
        await signInAppWithFB(res.token)
    }, [isWeb, promptAsync, signInFacebookNative, signInAppWithFB])

    return { prepared: request !== null, login: loginFacebook }
}
