import './config/yupSetup'

import mockAsyncStorage from '@react-native-async-storage/async-storage/jest/async-storage-mock'
import faker from 'faker'
import 'react-native-gesture-handler/jestSetup'

// async storage
jest.mock('@react-native-async-storage/async-storage', () => mockAsyncStorage)

// faker
faker.seed(12345)

// react-navigation
jest.mock('react-native-reanimated', () => {
    // eslint-disable-next-line global-require
    const Reanimated = require('react-native-reanimated/mock')
    Reanimated.default.call = () => {}

    return Reanimated
})

jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper')

// silence
const nativeConsoleError = global.console.error
global.console.error = (...args) => {
    if (
        [
            'You called act(async () => ...) without await', // rntl #379
            'CardContainer' // # rntl #750
        ].some((msg) => args.join('').includes(msg))
    )
        return
    nativeConsoleError(...args)
}
