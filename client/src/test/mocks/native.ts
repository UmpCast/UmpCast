import { mocked } from 'jest-mock'

import * as native from '@/utils/native'

const mNative = mocked(native, true)

export default {
    ...mNative
}
