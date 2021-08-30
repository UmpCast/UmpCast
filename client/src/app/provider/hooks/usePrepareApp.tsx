import { useState, useEffect } from 'react'

import * as SplashScreen from 'expo-splash-screen'
import { Platform } from 'react-native'

import { initializeApp } from '../providerUtils'
import useLoaderSubscriber from './useLoaderSubscriber'

export default function usePrepareApp(): boolean {
    const [prepared, setPrepared] = useState(false)
    const loaderSubscriber = useLoaderSubscriber({
        icon: 'static',
        title: 'UmpCast',
        message: null
    })

    useEffect(() => {
        async function prepare() {
            if (['ios', 'android'].includes(Platform.OS)) {
                await SplashScreen.preventAutoHideAsync()
                await initializeApp()
                await SplashScreen.hideAsync()
            } else {
                await loaderSubscriber(initializeApp)
            }

            setPrepared(true)
        }

        prepare()
    }, [])

    return prepared
}
