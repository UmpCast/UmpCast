import { useEffect } from 'react'

import { AuthSessionResult } from 'expo-auth-session'

import { authenticationVar } from '@/apollo/appCache'

import useSocialAuth from '../graphql/mutations/socialAuth'

export default function useSocialLogin(response: AuthSessionResult | null) {
    const [socialAuth, { loading }] = useSocialAuth()

    useEffect(() => {
        const attemptLogin = async () => {
            if (response?.type !== 'success') return false

            const { authentication } = response
            if (!authentication) return false

            const { data } = await socialAuth({
                variables: {
                    provider: 'google',
                    accessToken: authentication.accessToken
                }
            })

            if (!data?.socialAuth) return false
            const {
                socialAuth: { token: accessToken, refreshToken }
            } = data

            authenticationVar({
                accessToken,
                refreshToken
            })

            return true
        }

        attemptLogin()
    }, [response])

    return loading
}
