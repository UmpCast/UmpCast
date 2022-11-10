import AppDev from './dev/entry'

import { LogBox } from 'react-native'
import React from 'react'

LogBox.ignoreLogs(['EventEmitter.removeListener', "'SplashScreen"])

export default function () {
    return <AppDev />
}
