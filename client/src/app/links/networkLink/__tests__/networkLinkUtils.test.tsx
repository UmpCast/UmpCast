import { MockNetworkError } from 'app/links/models/__mocks__/networkError'

import { SERVER_ERROR, SERVER_ERROR_NAME, UNKNOWN_ERROR } from '../constants'
import { createReadableNetworkError } from '../networkLinkUtils'

describe('createReadableNetworkError Helper', () => {
    it('returns a readable error for supported error names', () => {
        const mServerError = MockNetworkError.build({ name: SERVER_ERROR_NAME })

        expect(createReadableNetworkError(mServerError)).toEqual(SERVER_ERROR)
    })

    it('returns an unknown error for unsupported error names', () => {
        const mUnknownError = MockNetworkError.build({ name: 'UnknownError' })

        expect(createReadableNetworkError(mUnknownError)).toEqual(UNKNOWN_ERROR)
    })
})
