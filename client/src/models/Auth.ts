export type AuthState = {
    authenticated: boolean
    registered: boolean
}

export type AuthSignInParams = {
    apiKey: string
    oobCode: string
    mode: string
}

export type AuthSignInResult = {
    prepared: boolean
    signIn: () => Promise<any>
}
