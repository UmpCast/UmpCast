import { LogBox } from 'react-native'
import * as WebBrowser from 'expo-web-browser'
import { initializeApp } from 'firebase/app'
import { loadAppExtra } from '@/utils/expo'
import AppDev from '@/components/AppDev'
import AppProd from '@/components/AppProd'

const isDevelopment = loadAppExtra().NODE_ENV === 'development'

if (isDevelopment) {
    // firebase auth uses depreceated AsyncStorage module
    LogBox.ignoreLogs([
        'AsyncStorage has been extracted from react-native core and will be removed in a future release'
    ])
}

WebBrowser.maybeCompleteAuthSession()

initializeApp(loadAppExtra().FIREBASE_CONFIG)

export default isDevelopment ? AppDev : AppProd
