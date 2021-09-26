import Observable from 'zen-observable'

import { createErrorFinder } from 'utils/error'


import { REFRESH_TOKEN_EXPIRED, REFRESH_TOKEN_CORRUPT } from './constants'

export type ErrorObservable = Observable<boolean>

export const shouldRevokeToken = createErrorFinder([REFRESH_TOKEN_EXPIRED])

export const shouldClearAuth = createErrorFinder([
    REFRESH_TOKEN_EXPIRED,
    REFRESH_TOKEN_CORRUPT // Token no longer exists in database
])
