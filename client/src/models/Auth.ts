export type AuthState = {
    authenticated: boolean
    registered: boolean
}

export type AuthSignInParams = {
    apiKey: string
    oobCode: string
    mode: string
}
