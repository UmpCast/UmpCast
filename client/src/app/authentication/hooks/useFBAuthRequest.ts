import { useCallback, useEffect } from 'react'
import {
    getAuth,
    FacebookAuthProvider,
    signInWithCredential
} from 'firebase/auth'
import * as FacebookNative from 'expo-facebook'
import * as Facebook from 'expo-auth-session/providers/facebook'
import { ResponseType } from 'expo-auth-session'
import { loadAppExtra } from '@/app/common/utils/appExtra'
import { AuthRequestResult } from './types'
import { getPlatform } from '@/app/common/utils/native'

export const signinFacebookNative = async () => {
    await FacebookNative.initializeAsync({
        appId: loadAppExtra().FACEBOOK_CLIENT_ID
    })
    return FacebookNative.logInWithReadPermissionsAsync({
        permissions: ['public_profile']
    })
}

export const signinFirebaseWithFB = async (accessToken: string) => {
    const auth = getAuth()
    const credential = FacebookAuthProvider.credential(accessToken)
    return signInWithCredential(auth, credential)
}

export default function useFacebookAuthRequest(): AuthRequestResult {
    const [request, response, promptAsync] = Facebook.useAuthRequest({
        responseType: ResponseType.Token,
        clientId: loadAppExtra().FACEBOOK_CLIENT_ID
    })

    useEffect(() => {
        if (response?.type === 'success') {
            const { access_token: accessToken } = response.params
            signinFirebaseWithFB(accessToken)
        }
    }, [response])

    const loginFacebook = useCallback(async () => {
        if (getPlatform().OS === 'web') {
            return promptAsync()
        }
        const res = await signinFacebookNative()
        if (res.type !== 'success') return null
        return signinFirebaseWithFB(res.token)
    }, [
        getPlatform().OS,
        promptAsync,
        signinFacebookNative,
        signinFirebaseWithFB
    ])

    return { prepared: request !== null, login: loginFacebook }
}
