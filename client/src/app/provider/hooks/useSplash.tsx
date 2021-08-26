import * as SplashScreen from 'expo-splash-screen'
import { Platform } from 'react-native'

import * as Loader from 'global/loader'

export const persistSplash = async () =>
    Platform.OS === 'web'
        ? Loader.startLoading({ title: 'UmpCast' })
        : SplashScreen.preventAutoHideAsync()

export const hideSplash = async () =>
    Platform.OS === 'web' ? Loader.stopLoading() : SplashScreen.hideAsync()
