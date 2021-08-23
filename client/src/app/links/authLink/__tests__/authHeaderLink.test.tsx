import { ApolloLink } from '@apollo/client'

import { MockAuthToken } from 'app/auth/models/__mocks__/token'
import { authTokenVar } from 'app/cache/reactiveVars'
import { mockLinkExecution } from 'utils/testing/apollo'

import authHeaderLink from '../authHeaderLink'

describe('authLinkHeader (authLink link)', () => {
    it('adds the authorization header when authTokenVar is set', () => {
        authTokenVar(MockAuthToken)

        const assertLink = new ApolloLink((operation) => {
            expect(operation.getContext()).toMatchObject({
                headers: {
                    Authorization: `JWT ${MockAuthToken.accessToken.token}`
                }
            })

            return null
        })

        mockLinkExecution(authHeaderLink, assertLink)
    })
})