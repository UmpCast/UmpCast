import '@/config/yup/setup'
import * as WebBrowser from 'expo-web-browser'
import { initializeApp, getApps } from 'firebase/app'
import { loadAppExtra } from '@/utils/expo'
import AppDev from '@/App.dev'
import AppProd from '@/App.prod'
import { initializeAuth } from 'firebase/auth'
import { getReactNativePersistence } from 'firebase/auth/react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'

const isDevelopment = loadAppExtra().NODE_ENV === 'development'

WebBrowser.maybeCompleteAuthSession()

if (!getApps().length) {
    const firebaseApp = initializeApp(loadAppExtra().FIREBASE_CONFIG)
    initializeAuth(firebaseApp, {
        persistence: getReactNativePersistence(AsyncStorage)
    })
}

export default isDevelopment ? AppDev : AppProd
