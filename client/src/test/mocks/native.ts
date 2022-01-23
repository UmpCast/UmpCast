import * as native from '@/utils/native'
import { mocked } from 'jest-mock'
const mNative = mocked(native, true)

export default {
    ...mNative
}
