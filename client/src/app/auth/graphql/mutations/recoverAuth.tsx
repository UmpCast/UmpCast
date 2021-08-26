import { REFRESH_TOKEN_EXPIRED } from 'app/auth/constants'

import refreshAccessToken from './_refreshAccessToken'
import setAuth from './_setAuth'

export default async function recoverAuth(): Promise<boolean> {
    const token = localStorage.getItem('refreshToken')
    if (!token) return false

    try {
        const accessToken = await refreshAccessToken(token)

        setAuth({
            refreshToken: {
                token
            },
            accessToken
        })
    } catch (err) {
        if (err.message === REFRESH_TOKEN_EXPIRED) return false
        throw err
    }

    return true
}
