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
        if (Platform.OS === 'web') {
            return promptAsync()
        }
        const res = await signinFacebookNative()
        if (res.type !== 'success') return null
        return signinFirebaseWithFB(res.token)
    }, [Platform.OS, promptAsync, signinFacebookNative, signinFirebaseWithFB])

    return { prepared: request !== null, login: loginFacebook }
}
