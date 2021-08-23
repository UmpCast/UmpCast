import { authTokenVar } from 'app/cache/reactiveVars'

import { AuthToken, SessionToken } from '../../models/token'

export default function setAuth(auth: AuthToken) {
    const refreshToken: SessionToken = {
        token: auth.token,
        exp: auth.exp
    }

    localStorage.setItem('refreshToken', JSON.stringify(refreshToken))

    authTokenVar(auth)
}
