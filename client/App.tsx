import { LogBox } from 'react-native'

import '@/app/app/utils/initializeApp'

import * as WebBrowser from 'expo-web-browser'
import { App } from '@/components/app'
import { loadAppExtra } from '@/utils/extra'

const isDevelopment = loadAppExtra().NODE_ENV === 'development'

if (isDevelopment) {
    // firebase auth uses depreceated AsyncStorage module
    LogBox.ignoreLogs([
        'AsyncStorage has been extracted from react-native core and will be removed in a future release'
    ])
}

WebBrowser.maybeCompleteAuthSession()

export default App
