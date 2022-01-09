import AsyncStorage from '@react-native-async-storage/async-storage'
import { RouteProp, useRoute } from '@react-navigation/native'
import { useEffect } from 'react'

import { EMAIL_SIGN_IN_KEY } from '@/constants'
import useSignInWithLink from '@/hooks/useSignInWithLink'
import { RootStackParamList, RootStackRoutes } from '@/rootStack'

type SignInLinkRedirectProp = RouteProp<
    RootStackParamList,
    RootStackRoutes.SignInLinkRedirect
>

export default function SignInLinkRedirectScreen() {
    const route = useRoute<SignInLinkRedirectProp>()
    const signInWithLink = useSignInWithLink()

    useEffect(() => {
        const signIn = async () => {
            const email = await AsyncStorage.getItem(EMAIL_SIGN_IN_KEY)
            if (email) signInWithLink(route.params, email)
        }

        signIn()
    }, [])

    return null
}
