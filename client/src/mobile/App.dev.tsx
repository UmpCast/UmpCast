import AppDev from './dev/entry'

import { LogBox } from 'react-native'

LogBox.ignoreLogs(['EventEmitter.removeListener', "'SplashScreen"])

export default function () {
    return <AppDev />
}
