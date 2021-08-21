import { MockRefreshTokenExpired } from 'mocks/error';

import * as createAccess from 'app/auth/graphql/mutations/createAccess'
import * as getAuth from 'app/auth/graphql/queries/getAuth'
import { authTokenVar } from 'app/cache'
import { mockAuthToken } from 'mocks/auth'

import { handleExpiredSignature } from '../authErrorLink';

describe('handleExpiredSignature helper', () => {
  it('returns true & sets a new access token when authToken valid', async () => {
    jest.spyOn(getAuth, 'default').mockReturnValue(mockAuthToken)
    const diffAccessToken = {
      token: 'other-access-token',
      exp: 456,
    }

    jest.spyOn(createAccess, 'default').mockResolvedValue(diffAccessToken)

    const handled = await handleExpiredSignature()

    expect(handled).toBeTruthy()
    expect(authTokenVar()).toMatchObject({
      ...mockAuthToken,
      accessToken: diffAccessToken,
    })
  })

  it('returns false when authToken invalid', async () => {
    const spyGetAuth = jest.spyOn(getAuth, 'default').mockReturnValue(null)
    jest.spyOn(createAccess, 'default').mockRejectedValue(MockRefreshTokenExpired)

    expect(await handleExpiredSignature()).toBeFalsy()

    spyGetAuth.mockReturnValue(mockAuthToken)

    expect(await handleExpiredSignature()).toBeFalsy()
  })
})
