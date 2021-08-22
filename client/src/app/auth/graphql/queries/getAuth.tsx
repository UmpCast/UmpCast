import { AuthToken } from 'app/auth/models/token'
import { authTokenVar } from 'app/cache/reactiveVars'

export default function getAuth(): AuthToken | null {
    return authTokenVar()
}
