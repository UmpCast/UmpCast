import { useCallback } from 'react'

import * as SplashScreen from 'expo-splash-screen'
import { Platform } from 'react-native'

import useLoader from '../hooks/useLoader'

export default function useSplash() {
    const { startLoading, stopLoading } = useLoader()

    const persistSplash = useCallback(
        async () =>
            Platform.OS === 'web'
                ? startLoading({ title: 'UmpCast' })
                : SplashScreen.preventAutoHideAsync(),
        [Platform, startLoading, SplashScreen]
    )

    const hideSplash = useCallback(
        async () =>
            Platform.OS === 'web' ? stopLoading() : SplashScreen.hideAsync(),
        [Platform, stopLoading, SplashScreen]
    )

    return { persistSplash, hideSplash }
}
