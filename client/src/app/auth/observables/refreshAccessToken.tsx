import Observable from 'zen-observable'

import { PartialDataError } from 'global/errors'

import {
    ErrorObservable
} from '../authUtils'
import clearAuthorization from '../graphql/mutations/clearAuthorization'
import getFreshAccessToken from '../graphql/mutations/getFreshAccessToken'
import revokeToken from '../graphql/mutations/revokeToken'
import setAuthorizationTokens from '../graphql/mutations/setAuthorizationTokens'
import getAuthorizationTokens from '../graphql/queries/getAuthorizationTokens'

import { createErrorFinder } from 'utils/error'

import { CORRUPT_REFRESH_TOKEN, REFRESH_TOKEN_EXPIRED } from '../constants'

const shouldRevokeToken = createErrorFinder([REFRESH_TOKEN_EXPIRED])

const shouldClearAuth = createErrorFinder([
    REFRESH_TOKEN_EXPIRED,
    CORRUPT_REFRESH_TOKEN
])

const refreshAccessTokenObservable: ErrorObservable = new Observable((sub) => {
    const authorizationData = getAuthorizationTokens()
    if (!authorizationData) throw new PartialDataError()

    const { refreshToken } = authorizationData.authorization

    getFreshAccessToken(refreshToken).then(({ data, errors }) => {
        if (sub.closed) {
            sub.next(false)
        } else if (data?.refreshToken) {
            setAuthorizationTokens(refreshToken, data.refreshToken.token)
            sub.next(true)
        } else if (errors) {
            if (shouldRevokeToken(errors)) revokeToken(refreshToken)
            if (shouldClearAuth(errors)) clearAuthorization()
            sub.next(false)
        }

        sub.complete()
    })
})

export default refreshAccessTokenObservable
