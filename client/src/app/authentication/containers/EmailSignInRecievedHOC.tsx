import { RouteProp, useRoute } from '@react-navigation/native'

import AsyncStorage from '@react-native-async-storage/async-storage'
import { useEffect } from 'react'
import { getAuth, signInWithEmailLink } from 'firebase/auth'
import { UnauthRoutes, UnauthStackParamList } from './UnauthStack'
import { EMAIL_SIGN_IN_KEY } from '../utils/constants'
import { loadAppExtra } from '@/app/common/utils/appExtra'

type EmailSignInReceivedScreenProp = RouteProp<
    UnauthStackParamList,
    UnauthRoutes.EmailSignInRecieved
>

export default function EmailSignInReceivedHOC() {
    const route = useRoute<EmailSignInReceivedScreenProp>()

    useEffect(() => {
        const signInLink = new URL(loadAppExtra().APP_URL)
        Object.entries(route.params).forEach(([key, val]) => {
            signInLink.searchParams.append(key, val)
        })

        const process = async () => {
            const email = await AsyncStorage.getItem(EMAIL_SIGN_IN_KEY)
            if (!email) return
            await signInWithEmailLink(getAuth(), email, signInLink.toString())
        }

        process()
    }, [])

    return null
}
