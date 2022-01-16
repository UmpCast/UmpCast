import mockAsyncStorage from '@react-native-async-storage/async-storage/jest/async-storage-mock'
import faker from 'faker'

jest.mock('@react-native-async-storage/async-storage', () => mockAsyncStorage)
faker.seed(12345)

const nativeConsoleError = global.console.error

global.console.error = (...args) => {
    if (args.join('').includes('You called act(async () => ...) without await'))
        return
    nativeConsoleError(...args)
}
