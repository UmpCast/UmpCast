import AppDev from './dev/entry'

import { LogBox } from 'react-native'
import { faker } from '@faker-js/faker'
import React from 'react'

LogBox.ignoreLogs(['EventEmitter.removeListener', "'SplashScreen"]) // Ignore log notification by message
// LogBox.ignoreAllLogs();//Ignore all log notifications

export default function () {
    return <AppDev />
}
