import { GraphQLError } from 'graphql'

import { AuthToken, SessionToken } from 'app/auth/models/token'
import { GetAccessToken_refreshToken } from 'generated/GetAccessToken'
import { TokenAuthVariables, TokenAuth_tokenAuth } from 'generated/TokenAuth'

export const mockAccessTokenResponse: GetAccessToken_refreshToken = {
  token: 'my-access-token',
  payload: {
    exp: 123,
  },
}

export const mockRefreshToken: SessionToken = {
  token: 'my-refresh-token',
  exp: 123,
}

export const mockAccessToken: SessionToken = {
  token: 'my-access-token',
  exp: 123,
}

export const mockAuthToken: AuthToken = {
  ...mockRefreshToken,
  accessToken: {
    token: 'my-access-token',
    exp: 123,
  },
}

export const mockTokenAuthVariables: TokenAuthVariables = {
  email: 'test@test.com',
  password: 'testing123',
}

export const mockCredentialError: Partial<GraphQLError> = {
  message: 'Please enter valid credentials',
  path: ['tokenAuth'],
}

export const mockTokenAuthResponse: TokenAuth_tokenAuth = {
  ...mockAccessTokenResponse,
  refreshToken: 'my-refresh-token',
  refreshExpiresIn: 123,
}
