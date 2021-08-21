import { ApolloLink, Observable } from '@apollo/client';

import * as resetAuth from 'app/auth/graphql/mutations/resetAuth';
import { authTokenVar } from 'app/cache'
import { mockLinkExecution } from 'mocks/apollo';
import { mockAuthToken } from 'mocks/auth'
import { MockRefreshTokenExpired } from 'mocks/error';

import authErrorLink from '../authErrorLink';
import * as authErrorLinkM from '../authErrorLink'

describe('authErrorLink (authLink link)', () => {
  const createTerminatingLink = (message: string) => new ApolloLink(() => new Observable((sub) => {
    sub.next({
      // @ts-ignore
      errors: [MockRefreshTokenExpired],
    })
    sub.complete()
  }))

  beforeEach(() => {
    authTokenVar(mockAuthToken)
  })

  it('handles signature error, resets auth, then terminates when refresh token ivalid', async () => {
    const spyHandler = jest.spyOn(authErrorLinkM, 'handleExpiredSignature').mockResolvedValue(false)
    const spyResetAuth = jest.spyOn(resetAuth, 'default').mockResolvedValue(true)

    const terminatingLink = createTerminatingLink('Signature has expired')
    const spyRequest = jest.spyOn(terminatingLink, 'request')

    await mockLinkExecution(authErrorLink, terminatingLink)

    expect(spyHandler).toHaveBeenCalledTimes(1)
    expect(spyResetAuth).toHaveBeenCalledTimes(1)
    expect(spyRequest).toHaveBeenCalledTimes(1)
  })

  it('resets auth if refreshToken is corrupt', async () => {
    const spyResetAuth = jest.spyOn(resetAuth, 'default')

    await mockLinkExecution(authErrorLink, createTerminatingLink('Error decoding signature'))

    expect(spyResetAuth).toHaveBeenCalledTimes(1)
  })

  it('handles signature error, then retries request when new access token obtained', async () => {
    const spyHandler = jest.spyOn(authErrorLinkM, 'handleExpiredSignature')
    spyHandler.mockResolvedValue(true)

    const terminatingLink = createTerminatingLink('Signature has expired')
    const spyRequest = jest.spyOn(terminatingLink, 'request')

    await mockLinkExecution(authErrorLink, terminatingLink)

    expect(spyHandler).toHaveBeenCalledTimes(1)
    expect(spyRequest).toHaveBeenCalledTimes(2)
  })
})
