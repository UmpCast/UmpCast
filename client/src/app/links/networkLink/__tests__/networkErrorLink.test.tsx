import { networkErrorVar } from 'app/cache/reactiveVars'
import mockLinkExecution from 'app/links/__mocks__/linkExecution'
import {
    MockNetworkError
} from 'app/links/models/__mocks__/networkError'

import MockNetworkErrorLink from '../__mocks__/mockNetworkErrorLink'
import * as networkLinkUtils from '../networkLinkUtils'
import { SERVER_ERROR, SERVER_ERROR_NAME } from '../constants'
import networkErrorLink from '..'

describe('networkErrorLink ApolloLink', () => {
    beforeEach(() => networkErrorVar(null))
    it('sets networkErrorVar, if a networkError is passed', async () => {
        const mockServerError = MockNetworkError.build({name: SERVER_ERROR_NAME})

        const terminatingLink = MockNetworkErrorLink(mockServerError)
        jest.spyOn(
            networkLinkUtils,
            'createReadableNetworkError'
        ).mockReturnValue(SERVER_ERROR)

        await mockLinkExecution(networkErrorLink, terminatingLink)

        expect(networkErrorVar()).toEqual(SERVER_ERROR)
    })
})
