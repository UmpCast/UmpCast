import { TokenAuth, TokenAuthVariables } from '../TokenAuth'

export const MockTokenAuthVariables:TokenAuthVariables = {
  email: 'test@test.com',
  password: 'testing123',
}

export const MockTokenAuth: TokenAuth = {
  tokenAuth: {
    token: 'new-access-token',
    payload: {
      exp: 123,
    },
    refreshToken: 'new-refresh-token',
    refreshExpiresIn: 999,
  },
}
