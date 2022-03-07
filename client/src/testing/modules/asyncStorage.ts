import AsyncStorage from '@react-native-async-storage/async-storage'
import { mocked } from 'jest-mock'

export default mocked(AsyncStorage, true)
