import AsyncStorage from '@react-native-async-storage/async-storage'
import { signInWithEmailLink, getAuth } from 'firebase/auth'
import { useEffect } from 'react'

import { EMAIL_SIGN_IN_KEY } from '@/config/constants/storage'
import { AuthSignInParams } from '@/models/Auth'
import { loadAppExtra } from '@/utils/expo'

export default function useAuthEmailReceiveLink({
    params
}: {
    params: AuthSignInParams
}) {
    useEffect(() => {
        const signIn = async () => {
            const email = await AsyncStorage.getItem(EMAIL_SIGN_IN_KEY)
            if (!email) return

            const signInLink = new URL(loadAppExtra().APP_URL)

            Object.entries(params).forEach(([key, val]) => {
                signInLink.searchParams.append(key, val)
            })

            if (!email) return
            await signInWithEmailLink(getAuth(), email, signInLink.toString())
        }

        signIn()
    }, [])
}
