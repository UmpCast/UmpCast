import { REFRESH_TOKEN_EXPIRED } from 'app/auth/constants';
import * as refreshAccess from 'app/auth/graphql/mutations/refreshAccess'
import * as getAuth from 'app/auth/graphql/queries/getAuth'
import { MockAuthToken } from 'app/auth/models/__mocks__/token';
import { authTokenVar } from 'app/cache/reactiveVars'

import handleAccessTokenExpired from '../handleAccessTokenExpired';

describe('handleExpiredSignature helper', () => {
  it('returns true & sets a new access token when authToken valid', async () => {
    jest.spyOn(getAuth, 'default').mockReturnValue(MockAuthToken)

    const diffAccessToken = {
      token: 'other-access-token',
      exp: 456,
    }

    jest.spyOn(refreshAccess, 'default').mockResolvedValue(diffAccessToken)

    const handled = await handleAccessTokenExpired()

    expect(handled).toBeTruthy()
    expect(authTokenVar()).toMatchObject({
      ...MockAuthToken,
      accessToken: diffAccessToken,
    })
  })

  it('returns false when refresh token expired', async () => {
    const spyGetAuth = jest.spyOn(getAuth, 'default').mockReturnValue(null)
    jest.spyOn(refreshAccess, 'default').mockRejectedValue({
      message: REFRESH_TOKEN_EXPIRED,
    })

    expect(await handleAccessTokenExpired()).toBeFalsy()

    spyGetAuth.mockReturnValue(MockAuthToken)

    expect(await handleAccessTokenExpired()).toBeFalsy()
  })
})
