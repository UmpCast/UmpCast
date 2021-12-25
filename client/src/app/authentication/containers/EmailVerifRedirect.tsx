import { RouteProp, useRoute } from '@react-navigation/native'

import AsyncStorage from '@react-native-async-storage/async-storage'
import { useEffect } from 'react'
import { getAuth, signInWithEmailLink } from 'firebase/auth'
import { UnauthStackParamList } from './UnauthStack'

type VerifyScreenProp = RouteProp<UnauthStackParamList, 'Verify'>

export default function EmailVerifRedirect() {
    const route = useRoute<VerifyScreenProp>()

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
