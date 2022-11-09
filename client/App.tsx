import '@/config/yup/setup'
import { initializeApp, getApps } from 'firebase/app'
import { initializeAuth } from 'firebase/auth'
import { getReactNativePersistence } from 'firebase/auth/react-native'
import {maybeCompleteAuthSession} from 'expo-web-browser'

import { expoExtra } from '@/utils/expo'
import AsyncStorage from '@react-native-async-storage/async-storage'
import AppDev from './src/mobile/App.dev'
import AppProd from './src/mobile/App.prod'

maybeCompleteAuthSession()

if (!getApps().length) {
    const firebaseApp = initializeApp(expoExtra.FIREBASE_CONFIG)
    
    initializeAuth(firebaseApp, {
        persistence: getReactNativePersistence(AsyncStorage)
    })
}


const isProd = expoExtra.NODE_ENV === 'production'

export default isProd ? AppProd : AppDev
