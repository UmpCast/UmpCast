import AsyncStorage from '@react-native-async-storage/async-storage'
import { LoginWithEmailLink, getAuth } from 'firebase/auth'
import { useEffect } from 'react'

import { EMAIL_SIGN_IN_KEY } from '@/config/constants/storage'
import { loadAppExtra } from '@/utils/expo'

import { AuthEmailLoginParams } from '../../model'

export default function useAuthEmailReceiveLoginLinkEffect({
    params
}: {
    params: AuthEmailLoginParams
}) {
    useEffect(() => {
        const Login = async () => {
            const email = await AsyncStorage.getItem(EMAIL_SIGN_IN_KEY)
            if (!email) return

            const LoginLink = new URL(loadAppExtra().APP_URL)

            Object.entries(params).forEach(([key, val]) => {
                LoginLink.searchParams.append(key, val)
            })

            if (!email) return
            await LoginWithEmailLink(getAuth(), email, LoginLink.toString())
        }

        Login()
    }, [])
}
