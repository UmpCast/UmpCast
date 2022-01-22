import { EMAIL_SIGN_IN_KEY } from '@/constants';
import useSignInWithLink from '@/hooks/useSignInWithLink';
import { useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { SignInParams } from '@/models/signInParams';

export default ({params}: {params: SignInParams}) =>  {
    const signInWithLink = useSignInWithLink()

    useEffect(() => {
        const signIn = async () => {
            const email = await AsyncStorage.getItem(EMAIL_SIGN_IN_KEY)
            console.log(email)
            if (email) signInWithLink(params, email)
        }

        signIn()
    }, [])

    return null
}