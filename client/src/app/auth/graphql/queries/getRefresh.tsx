import { SessionToken } from '../../models/token'

export default function getRefresh(): SessionToken | null {
    const stringifiedRefreshToken = localStorage.getItem('refreshToken')
    if (stringifiedRefreshToken === null) return null

    const refreshToken = JSON.parse(stringifiedRefreshToken) as SessionToken

    return refreshToken
}
