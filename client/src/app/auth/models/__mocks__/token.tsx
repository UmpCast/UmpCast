import { SessionToken, AuthToken, AccessToken } from '../token'

export const MockRefreshToken: SessionToken = {
    token: 'refresh-token'
}

export const MockAccessToken: AccessToken = {
    token: 'access-token',
    exp: 123
}

export const MockAuthToken: AuthToken = {
    refreshToken: {
        token: 'auth-refresh-token'
    },
    accessToken: {
        token: 'auth-access-token',
        exp: 123
    }
}
