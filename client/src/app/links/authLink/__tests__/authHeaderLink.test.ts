import { ApolloLink } from '@apollo/client';

import { authTokenVar } from 'app/cache'
import { mockLinkExecution } from 'mocks/apollo';
import { mockAuthToken } from 'mocks/auth';

import authHeaderLink from '../authHeaderLink';

describe('authLinkHeader (authLink link)', () => {
  it('adds the authorization header when authTokenVar is set', () => {
    authTokenVar(mockAuthToken)

    const assertLink = new ApolloLink((operation) => {
      expect(operation.getContext()).toMatchObject({
        headers: {
          Authorization: `JWT ${mockAuthToken.accessToken.token}`,
        },
      })

      return null
    })

    mockLinkExecution(authHeaderLink, assertLink)
  })
})
