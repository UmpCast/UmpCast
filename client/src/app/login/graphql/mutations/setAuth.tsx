import { authenticationVar } from 'apollo/appCache'

export default function setAuth(accessToken: string, refreshToken: string) {
    authenticationVar({
        accessToken,
        refreshToken
    })
}
