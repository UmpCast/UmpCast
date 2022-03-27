export type AuthSignInReturn = {
    prepared: boolean
    signIn: () => Promise<any>
}
