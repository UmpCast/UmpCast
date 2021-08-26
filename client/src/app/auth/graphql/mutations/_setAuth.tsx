import { authTokenVar } from 'global/reactiveVars'

import { AuthToken } from '../../models/token'

export default function setAuth(auth: AuthToken): void {
    localStorage.setItem('refreshToken', auth.refreshToken.token)

    authTokenVar(auth)
}
