import { mocked } from 'jest-mock'

import * as Native from '@/utils/native'

export const mockNative = mocked(Native, true)

function getPlatform(platform: 'web' | 'mobile') {
    mockNative.getPlatform.mockReturnValue({
        OS: platform === 'web' ? 'web' : 'ios'
    } as never)
}

export default {
    mock: {
        getPlatform
    },
    ...mockNative
}
