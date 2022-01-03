import { RouteProp, useRoute } from '@react-navigation/native'

import AsyncStorage from '@react-native-async-storage/async-storage'
import { useEffect } from 'react'
import { getAuth, signInWithEmailLink } from 'firebase/auth'
import { EMAIL_SIGN_IN_KEY } from '../../../constants'
import useAssertRegistered from '@/hooks/useAssertRegistered'
import { RootStackParamList, RootStackRoutes } from '@/navigation/rootStack'
import { loadAppExtra } from '@/utils/extra'

type EmailReceivedScreenProp = RouteProp<
    RootStackParamList,
    RootStackRoutes.SignInEmailRecieved
>

export default function EmailRecievedContainer() {
    const route = useRoute<EmailReceivedScreenProp>()
    const assertRegistered = useAssertRegistered()

    useEffect(() => {
        const signInLink = new URL(loadAppExtra().APP_URL)
        Object.entries(route.params).forEach(([key, val]) => {
            signInLink.searchParams.append(key, val)
        })

        const process = async () => {
            const email = await AsyncStorage.getItem(EMAIL_SIGN_IN_KEY)
            if (!email) return
            await signInWithEmailLink(getAuth(), email, signInLink.toString())
            await assertRegistered()
        }

        process()
    }, [])

    return null
}
