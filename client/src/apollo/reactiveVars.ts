import { makeVar } from '@apollo/client'

import { AuthToken } from 'app/auth/models/token'
import Loader from 'app/overlay/models/Loader'

export const authTokenVar = makeVar<AuthToken | null>(null)
export const loaderVar = makeVar<Loader>({})
export const appLoadingVar = makeVar<boolean>(false)
