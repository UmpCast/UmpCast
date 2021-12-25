import { LogBox } from 'react-native'
import App from './src/app/app'

import { loadAppExtra } from '@/app/common/utils/appBuild'

if (loadAppExtra().NODE_ENV === 'development') {
    // firebase auth uses depreceated AsyncStorage module
    LogBox.ignoreLogs([
        'AsyncStorage has been extracted from react-native core and will be removed in a future release'
    ])
}

export default App
