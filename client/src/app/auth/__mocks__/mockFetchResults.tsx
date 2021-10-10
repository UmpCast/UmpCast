import { ACCESS_TOKEN_EXPIRED, REFRESH_TOKEN_EXPIRED } from '../constants'

export const GenericResult = {
    data: {
        foo: 'bar'
    }
}

export const GetFreshAccessTokenResult = (token: string) => ({
    data: {
        refreshToken: {
            token
        }
    }
})

export const RevokeRefreshTokenResult = (revoked: boolean) => ({
    data: {
        revokeToken: {
            revoked
        }
    }
})

export const AccessTokenExpiredError = {
    errors: [
        {
            message: ACCESS_TOKEN_EXPIRED
        }
    ]
}

export const RefreshTokenExpiredError = {
    errors: [
        {
            message: REFRESH_TOKEN_EXPIRED
        }
    ]
}

export const RefreshTokenCorruptError = {
    errors: [
        {
            message: REFRESH_TOKEN_EXPIRED
        }
    ]
}
