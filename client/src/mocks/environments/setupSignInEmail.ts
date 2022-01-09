import AsyncStorage from '@react-native-async-storage/async-storage'

import { EMAIL_SIGN_IN_KEY } from '@/constants'

import { firebaseAuth } from './mocked'

export default function setupSignInEmail({
    email,
    stored = false,
    properSignIn
}: {
    email: string
    stored?: boolean
    properSignIn?: {
        triggerAuthStateChange: (auth: boolean) => void
    }
}) {
    if (stored) AsyncStorage.setItem(EMAIL_SIGN_IN_KEY, email)

    if (properSignIn) {
        firebaseAuth.signInWithEmailLink.mockImplementation((): any => {
            properSignIn.triggerAuthStateChange(true)
        })
    }
}
