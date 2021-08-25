export interface SessionToken {
    token: string
}

export interface AccessToken extends SessionToken {
    exp: number
}

export interface AuthToken {
    refreshToken: SessionToken
    accessToken: AccessToken
}
