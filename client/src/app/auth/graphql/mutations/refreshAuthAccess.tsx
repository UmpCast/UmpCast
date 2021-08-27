import { REFRESH_TOKEN_EXPIRED } from 'app/auth/constants'
import { AuthTokenNotFoundError } from 'app/auth/errors'
import { authTokenVar } from 'global/client'

import refreshAccessToken from './_refreshAccessToken'
import setAuth from './_setAuth'
import resetAuth from './resetAuth'

export default async function refreshAuthAccess(): Promise<boolean> {
    const authToken = authTokenVar()
    if (!authToken) throw new AuthTokenNotFoundError()

    const { refreshToken } = authToken

    try {
        const accessToken = await refreshAccessToken(refreshToken.token)

        setAuth({
            refreshToken,
            accessToken
        })
    } catch (err) {
        if (err.message === REFRESH_TOKEN_EXPIRED) {
            await resetAuth()
            return false
        }

        throw err
    }

    return true
}
