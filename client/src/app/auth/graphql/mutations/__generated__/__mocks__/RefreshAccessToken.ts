import { RefreshAccessToken, RefreshAccessTokenVariables } from '../RefreshAccessToken'

export const MockRefreshAccessTokenVariables: RefreshAccessTokenVariables = {
  refreshToken: 'my-refresh-token'
}

export const MockRefreshAccessToken: RefreshAccessToken = {
  refreshToken: {
    token: 'refreshed-access-token',
    payload: {
      exp: 456,
    },
  },
}