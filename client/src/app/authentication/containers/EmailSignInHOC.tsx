import { RouteProp, useRoute } from '@react-navigation/native'

import AsyncStorage from '@react-native-async-storage/async-storage'
import { useEffect } from 'react'
import { getAuth, signInWithEmailLink } from 'firebase/auth'
import { UnauthRoutes, UnauthStackParamList } from './UnauthStack'

type EmailSignInScreenProp = RouteProp<
    UnauthStackParamList,
    UnauthRoutes.EmailSignIn
>

export default function EmailSignInHOC() {
    const route = useRoute<EmailSignInScreenProp>()

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
