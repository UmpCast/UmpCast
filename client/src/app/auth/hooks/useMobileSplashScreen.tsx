import { useEffect } from 'react'

import * as SplashScreen from 'expo-splash-screen'
import { Platform } from 'react-native'


const useMobileSplashScreen = (initialized: boolean) => {
    useEffect(() => {
        async function prepare() {
            if (!['ios', 'android'].includes(Platform.OS)) return

            if (!initialized) await SplashScreen.preventAutoHideAsync()
            else await SplashScreen.hideAsync()
        }

        prepare()
    }, [initialized])
}

export default useMobileSplashScreen
