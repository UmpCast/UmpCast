import { networkErrorVar } from 'app/cache/reactiveVars'
import mockLinkExecution from 'app/links/__mocks__/linkExecution'
import {
    MockServerError,
    MockReadableError
} from 'app/links/models/__mocks__/networkError'

import MockNetworkErrorLink from '../__mocks__/mockNetworkErrorLink'
import networkErrorLink from '../networkErrorLink'
import * as networkLinkUtils from '../networkLinkUtils'

describe('networkErrorLink ApolloLink', () => {
    beforeEach(() => networkErrorVar(null))
    it('sets networkErrorVar, if a networkError is passed', async () => {
        const terminatingLink = MockNetworkErrorLink(MockServerError)
        jest.spyOn(
            networkLinkUtils,
            'createReadableNetworkError'
        ).mockReturnValue(MockReadableError)

        await mockLinkExecution(networkErrorLink, terminatingLink)

        expect(networkErrorVar()).toEqual(MockReadableError)
    })
})
