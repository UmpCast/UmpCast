import {
    MockServerError,
    MockUnknownError
} from 'app/links/models/__mocks__/networkError'
import { SERVER_ERROR, UNKNOWN_ERROR } from 'app/links/models/networkError'

import { createReadableNetworkError } from '../networkLinkUtils'

describe('createReadableNetworkError Helper', () => {
    it('returns a different error for supported error names', () => {
        expect(createReadableNetworkError(MockServerError)).toEqual(
            SERVER_ERROR
        )
    })

    it('returns an unknown error for unsupported error names', () => {
        expect(createReadableNetworkError(MockUnknownError)).toEqual(
            UNKNOWN_ERROR
        )
    })
})
