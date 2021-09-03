import Observable from 'zen-observable'

import baseClient from 'apollo/baseClient'
import { PartialDataError } from 'global/errors'

import {
    shouldRevokeToken,
    shouldClearAuth,
    ErrorObservable
} from '../authUtils'
import clearAuthorization from '../graphql/mutations/clearAuthorization'
import getFreshAccessToken from '../graphql/mutations/getFreshAccessToken'
import revokeToken from '../graphql/mutations/revokeToken'
import setAuthorizationTokens from '../graphql/mutations/setAuthorizationTokens'
import { GetAuthorizationTokens } from '../graphql/queries/__generated__/GetAuthorizationTokens'
import { GET_AUTHORIZATION_TOKENS } from '../graphql/queries/getAuthorizationTokens'

const refreshAccessTokenObservable: ErrorObservable = new Observable((sub) => {
    const authorizationData = baseClient.readQuery<GetAuthorizationTokens>({
        query: GET_AUTHORIZATION_TOKENS
    })

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
