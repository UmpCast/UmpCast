export type AppSignInReturn = {
    prepared: boolean
    signIn: () => Promise<any>
}
