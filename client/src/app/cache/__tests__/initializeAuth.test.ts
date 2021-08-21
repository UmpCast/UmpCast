import * as createAccess from 'app/auth/graphql/mutations/createAccess'
import * as getRefresh from 'app/auth/graphql/queries/getRefresh'
import { mockAccessToken, mockRefreshToken } from 'mocks/auth'

import ClientCache, { authTokenVar } from '..'

describe('initializeAuth Method', () => {
  it('returns false if getRefresh returns null', async () => {
    jest.spyOn(getRefresh, 'default').mockReturnValue(null)

    expect(await ClientCache.initializeAuth()).toBeFalsy()
  })

  it('returns true and sets authTokenVar if both tokens are resolved', async () => {
    jest.spyOn(getRefresh, 'default').mockReturnValue(mockRefreshToken)
    jest.spyOn(createAccess, 'default').mockResolvedValue(mockAccessToken)

    expect(await ClientCache.initializeAuth()).toBeTruthy()
    expect(authTokenVar()).toEqual({
      ...mockRefreshToken,
      accessToken: mockAccessToken,
    })
  })
})
