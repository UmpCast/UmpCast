import '@/config/yup/setup'
import { LogBox } from 'react-native'
import * as WebBrowser from 'expo-web-browser'
import { initializeApp } from 'firebase/app'
import { loadAppExtra } from '@/utils/expo'
import AppDev from '@/App.dev'
import AppProd from '@/App.prod'
const isDevelopment = loadAppExtra().NODE_ENV === 'development'

if (isDevelopment) {
    // firebase auth uses depreceated AsyncStorage module
    LogBox.ignoreLogs([
        'AsyncStorage has been extracted from react-native core and will be removed in a future release',
        'Non-serializable values were found in the navigation state'
    ])
}

WebBrowser.maybeCompleteAuthSession()
initializeApp(loadAppExtra().FIREBASE_CONFIG)

export default isDevelopment ? AppDev : AppProd
