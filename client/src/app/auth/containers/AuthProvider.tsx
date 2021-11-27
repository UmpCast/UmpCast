import React from 'react'

import { Platform } from 'react-native'

import AppSplashScreen from '../components/appSplashScreen'
import useAuthentication from '../hooks/useAuthentication'
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
    useMobileSplashScreen(initialized)

    const [prepared, authentication] = useAuthentication(initialized)

    if (!prepared && Platform.OS === 'web') return webSplash

    return authentication !== null ? loggedIn : loggedOut
}
