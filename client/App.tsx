import '@/config/yup/setup'
import AsyncStorage from '@react-native-async-storage/async-storage'
import * as WebBrowser from 'expo-web-browser'
import { initializeApp, getApps } from 'firebase/app'
import { initializeAuth } from 'firebase/auth'
import { getReactNativePersistence } from 'firebase/auth/react-native'

import AppDev from './src/mobile/App.dev'
import AppProd from './src/mobile/App.prod'
import { loadAppExtra } from '@/utils/expo'

const isDevelopment = loadAppExtra().NODE_ENV === 'development'

WebBrowser.maybeCompleteAuthSession()

if (!getApps().length) {
    const firebaseApp = initializeApp(loadAppExtra().FIREBASE_CONFIG)
    initializeAuth(firebaseApp, {
        persistence: getReactNativePersistence(AsyncStorage)
    })
}

export default isDevelopment ? AppDev : AppProd
