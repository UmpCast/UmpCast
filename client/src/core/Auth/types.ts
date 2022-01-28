export interface SignInResult {
    prepared: boolean
    signIn: () => Promise<any>
}
