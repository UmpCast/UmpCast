import { useCallback, useEffect } from 'react'
import {
    getAuth,
    FacebookAuthProvider,
    signInWithCredential
} from 'firebase/auth'
import * as FacebookNative from 'expo-facebook'
import * as Facebook from 'expo-auth-session/providers/facebook'
import { ResponseType } from 'expo-auth-session'
import { Platform } from 'react-native'
import { loadAppExtra } from '@/app/common/utils/appExtra'
import { AuthRequestResult } from './types'

export const loginFacebookNative = async () => {
    await FacebookNative.initializeAsync({
        appId: '1064508127435119'
    })
    return FacebookNative.logInWithReadPermissionsAsync({
        permissions: ['public_profile']
    })
}

export const loginFirebaseWithFB = async (accessToken: string) => {
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
            loginFirebaseWithFB(accessToken)
        }
    }, [response])

    const loginFacebook = useCallback(async () => {
        if (Platform.OS === 'web') {
            return promptAsync()
        }
        const res = await loginFacebookNative()
        if (res.type !== 'success') return null
        return loginFirebaseWithFB(res.token)
    }, [Platform.OS, promptAsync, loginFacebookNative, loginFirebaseWithFB])

    return { prepared: request !== null, login: loginFacebook }
}
