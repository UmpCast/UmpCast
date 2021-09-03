import Observable from 'zen-observable'

import { createErrorFinder } from 'utils/error'

import { CORRUPT_REFRESH_TOKEN, REFRESH_TOKEN_EXPIRED } from './constants'

export const shouldRevokeToken = createErrorFinder([REFRESH_TOKEN_EXPIRED])
export const shouldClearAuth = createErrorFinder([
    REFRESH_TOKEN_EXPIRED,
    CORRUPT_REFRESH_TOKEN
])

export type ErrorObservable = Observable<boolean>
