import AsyncStorage from '@react-native-async-storage/async-storage'
import { mocked } from 'jest-mock'

const mAsyncStorage = mocked(AsyncStorage, true)

export default {
    ...mAsyncStorage
}
