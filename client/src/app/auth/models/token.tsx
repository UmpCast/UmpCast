export interface SessionToken {
    token: string
    exp: number
}

export interface AuthToken extends SessionToken {
    accessToken: SessionToken
}
