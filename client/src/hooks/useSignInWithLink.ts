import { signInWithEmailLink, getAuth } from 'firebase/auth'

import { SignInParams } from '@/models/signInParams'
import { loadAppExtra } from '@/utils/expo'

export default function useSignInWithLink() {
    const signInWithLink = async (params: SignInParams, email: string) => {
        const signInLink = new URL(loadAppExtra().APP_URL)

        Object.entries(params).forEach(([key, val]) => {
            signInLink.searchParams.append(key, val)
        })

        if (!email) return
        await signInWithEmailLink(getAuth(), email, signInLink.toString())
    }

    return signInWithLink
}
