import { makeVar } from '@apollo/client'

import { AuthToken } from 'app/auth/models/token'
import LoaderOptions from 'app/provider/models/LoaderOptions'

export const authTokenVar = makeVar<AuthToken | null>(null)
export const loaderOptionsVar = makeVar<LoaderOptions>({})
export const appLoadingVar = makeVar<boolean>(false)
