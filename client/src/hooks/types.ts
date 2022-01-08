export interface AuthRequestResult {
    prepared: boolean
    login: () => Promise<any>
}
