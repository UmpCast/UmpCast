import React from 'react'

import { Text } from 'native-base'

import getAuthorizationTokens from '../graphql/queries/getAuthenticationTokens'
import useInitializedAuth from '../hooks/useInitializedAuth'

export default function AuthProvider({
    loggedIn,
    loggedOut
}: {
    loggedIn: JSX.Element
    loggedOut: JSX.Element
}) {
    const initialized = useInitializedAuth()
    const authenticated = getAuthorizationTokens() != null

    if (!initialized) return <Text>UmpCast</Text>

    return authenticated ? loggedIn : loggedOut
}
