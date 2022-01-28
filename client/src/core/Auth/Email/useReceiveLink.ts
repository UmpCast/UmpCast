import { signInWithEmailLink, getAuth } from 'firebase/auth'

import { loadAppExtra } from '@/utils/expo'

import { SignInParams } from '../models'
import { EMAIL_SIGN_IN_KEY } from '@/constants/storage'
import { useEffect } from 'react'

import AsyncStorage from '@react-native-async-storage/async-storage'

export default function useAuthEmailReceiveLink({
    params
}: {
    params: SignInParams
}) {
    const signInWithLink = async (params: SignInParams, email: string) => {
        const signInLink = new URL(loadAppExtra().APP_URL)

        Object.entries(params).forEach(([key, val]) => {
            signInLink.searchParams.append(key, val)
        })

        if (!email) return
        await signInWithEmailLink(getAuth(), email, signInLink.toString())
    }

    useEffect(() => {
        const signIn = async () => {
            const email = await AsyncStorage.getItem(EMAIL_SIGN_IN_KEY)
            if (email) signInWithLink(params, email)
        }

        signIn()
    }, [])

    return signInWithLink
}
