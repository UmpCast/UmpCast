import React from 'react'

import { useQuery } from '@apollo/client'
import { Platform } from 'react-native'

import AppSplashScreen from '../components/appSplashScreen'
import { GetAuthentication } from '../graphql/queries/__generated__/GetAuthentication'
import { GET_AUTHENTICATION } from '../graphql/queries/getAuthentication'
import useInitializedAuth from '../hooks/useInitializedAuth'
import useMobileSplashScreen from '../hooks/useMobileSplashScreen'

export default function AuthProvider({
    webSplash = <AppSplashScreen />,
    loggedIn,
    loggedOut
}: {
    webSplash?: JSX.Element
    loggedIn: JSX.Element
    loggedOut: JSX.Element
}) {
    const initialized = useInitializedAuth()
    const { data } = useQuery<GetAuthentication>(GET_AUTHENTICATION)

    useMobileSplashScreen(initialized)
    if (!initialized && Platform.OS === 'web') return webSplash

    return data?.authentication !== null ? loggedIn : loggedOut
}
