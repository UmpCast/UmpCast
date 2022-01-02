import { LogBox } from 'react-native'
import App from './src/app/app'

import { loadAppExtra } from '@/app/common/utils/appExtra'
import '@/app/app/utils/initializeApp'

import * as WebBrowser from 'expo-web-browser'

const isDevelopment = loadAppExtra().NODE_ENV === 'development'

if (isDevelopment) {
    // firebase auth uses depreceated AsyncStorage module
    LogBox.ignoreLogs([
        'AsyncStorage has been extracted from react-native core and will be removed in a future release'
    ])
}

WebBrowser.maybeCompleteAuthSession()

export default isDevelopment ? App.Dev : App.Main
