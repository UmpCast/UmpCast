import AsyncStorage from '@react-native-async-storage/async-storage'
import { RouteProp, useRoute } from '@react-navigation/native'
import { getAuth, signInWithEmailLink } from 'firebase/auth'
import { useEffect } from 'react'

import { EMAIL_SIGN_IN_KEY } from '@/constants'
import { RootStackParamList, RootStackRoutes } from '@/navigation/rootStack'
import { loadAppExtra } from '@/utils/expoUtils'

type EmailReceivedScreenProp = RouteProp<
    RootStackParamList,
    RootStackRoutes.SignInEmailRecieved
>

export default function EmailRecievedContainer() {
    const route = useRoute<EmailReceivedScreenProp>()

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
