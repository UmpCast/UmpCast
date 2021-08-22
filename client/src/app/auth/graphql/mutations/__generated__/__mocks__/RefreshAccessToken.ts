import { RefreshAccessToken } from '../RefreshAccessToken'

export const MockRefreshAccessToken: RefreshAccessToken = {
  refreshToken: {
    token: 'refreshed-access-token',
    payload: {
      exp: 456,
    },
  },
}