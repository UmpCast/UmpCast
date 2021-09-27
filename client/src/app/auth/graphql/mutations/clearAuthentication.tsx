import { authenticationVar } from 'apollo/appCache'

export default function clearAuthentication(): void {
    authenticationVar(null)
}
