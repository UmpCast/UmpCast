import { SessionToken, AuthToken } from '../token'

export const MockRefreshToken: SessionToken = {
  token: 'refresh-token',
  exp: 999,
}

export const MockAccessToken: SessionToken = {
  token: 'access-token',
  exp: 123,
}

export const MockAuthToken: AuthToken = {
  token: 'auth-refresh-token',
  exp: 999,
  accessToken: {
    token: 'auth-access-token',
    exp: 123,
  },
}
