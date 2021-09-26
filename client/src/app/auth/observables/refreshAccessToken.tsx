import { ApolloError } from '@apollo/client'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Observable from 'zen-observable'

import { hasErrorMessage } from 'utils/error'

import { ErrorObservable } from '../authUtils'
import { REFRESH_TOKEN_CORRUPT, REFRESH_TOKEN_EXPIRED } from '../constants'
import clearAuthentication from '../graphql/mutations/clearAuthentication'
import getFreshAccessToken from '../graphql/mutations/getFreshAccessToken'
import revokeRefreshToken from '../graphql/mutations/revokeToken'
import setAuthenticationTokens from '../graphql/mutations/setAuthenticationTokens'
import getAuthenticationTokens from '../graphql/queries/getAuthenticationTokens'

const refreshAccessTokenObservable: ErrorObservable = new Observable((sub) => {
    const result = getAuthenticationTokens()
    if (!result) {
        sub.next(false)
        sub.complete()
        return
    }

    const { refreshToken } = result.authentication

    getFreshAccessToken(refreshToken)
        .then(async ({ data }) => {
            sub.next(true)

            if (data?.refreshToken)
                await setAuthenticationTokens(
                    refreshToken,
                    data.refreshToken.token
                )
        })
        .catch(async (err) => {
            sub.next(false)
            if (!(err instanceof ApolloError)) throw err

            const shouldRevoke = hasErrorMessage(err, [REFRESH_TOKEN_EXPIRED])
            const shouldClearAuth =
                shouldRevoke || hasErrorMessage(err, [REFRESH_TOKEN_CORRUPT])

            if (shouldRevoke)
                await Promise.allSettled([
                    revokeRefreshToken(refreshToken),
                    AsyncStorage.removeItem('refreshToken')
                ])

            if (shouldClearAuth) clearAuthentication()
            else throw err
        })
        .finally(sub.complete)
})

export default refreshAccessTokenObservable
