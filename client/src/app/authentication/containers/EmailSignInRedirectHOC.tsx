import { RouteProp, useRoute } from '@react-navigation/native'

import AsyncStorage from '@react-native-async-storage/async-storage'
import { useEffect } from 'react'
import { getAuth, signInWithEmailLink } from 'firebase/auth'
import { UnauthRoutes, UnauthStackParamList } from './UnauthStack'

type EmailSignInRedirectScreenProp = RouteProp<
    UnauthStackParamList,
    UnauthRoutes.EmailSignInRedirect
>

export default function EmailSignInRedirectHOC() {
    const route = useRoute<EmailSignInRedirectScreenProp>()

    useEffect(() => {
        const process = async () => {
            const email = await AsyncStorage.getItem('@umpcast:signin-email')
            if (!email) return
            await signInWithEmailLink(getAuth(), email, route.path)
        }

        process()
    }, [])

    return null
}
