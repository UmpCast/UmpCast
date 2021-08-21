import { authTokenVar } from 'app/cache'
import { mockRefreshAccessTokenResponse, mockAuthToken } from 'mocks/auth'
import { BaseClient } from 'utils/fetch'

import refreshAccess from '../refreshAccess'

beforeEach(() => {
  authTokenVar(null)
})

describe('refreshAccess Mutation', () => {
  beforeEach(() => authTokenVar(null))

  it('replaces access token with a new one', async () => {
    const spyMutate = jest.spyOn(BaseClient, 'mutate')
    // @ts-ignore
    spyMutate.mockResolvedValue({
      data: mockRefreshAccessTokenResponse,
    })

    const accessToken = await refreshAccess(mockAuthToken)

    const refreshToken = mockRefreshAccessTokenResponse.refreshToken!

    expect(accessToken).toEqual({
      token: refreshToken.token,
      exp: refreshToken.payload.exp,
    })
  })
})
