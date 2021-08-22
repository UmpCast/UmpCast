import { MockAuthToken } from 'app/auth/models/__mocks__/token'
import { authTokenVar } from 'app/cache'
import { BaseClient } from 'utils/fetch'

import { MockRefreshAccessToken } from '../__generated__/__mocks__/RefreshAccessToken'
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
      data: MockRefreshAccessToken,
    })
    const response = MockRefreshAccessToken.refreshToken!

    const accessToken = await refreshAccess(MockAuthToken)

    expect(accessToken).toEqual({
      token: response.token,
      exp: response.payload.exp,
    })
  })
})
