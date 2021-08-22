import { MockRefreshToken } from 'app/auth/models/__mocks__/token'

import getRefresh from '../../queries/getRefresh'

describe('getRefresh Mutation', () => {
  it('returns null when no refresh token found in localStorage', () => {
    const refreshToken = getRefresh()
    expect(refreshToken).toBeNull()
  })

  it('returns the refresh token when present in localStorage', () => {
    localStorage.setItem('refreshToken', JSON.stringify(MockRefreshToken))
    const refreshToken = getRefresh()

    expect(refreshToken).toEqual(MockRefreshToken)
  })
})
