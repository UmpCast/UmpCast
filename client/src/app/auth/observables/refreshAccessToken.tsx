import { ApolloError } from '@apollo/client'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Observable from 'zen-observable'

import { hasErrorMessage } from 'utils/error'

import { ErrorObservable } from '../authUtils'
import { REFRESH_TOKEN_CORRUPT, REFRESH_TOKEN_EXPIRED } from '../constants'
import clearAuthentication from '../graphql/mutations/clearAuthentication'
import revokeRefreshToken from '../graphql/mutations/revokeRefreshToken'
import setFreshAccessToken from '../graphql/mutations/setFreshAccessToken'
import getAuthentication from '../graphql/queries/getAuthentication'

const refreshAccessTokenObservable: ErrorObservable = new Observable((sub) => {
    const attemptRefreshAccessToken = async (): Promise<boolean> => {
        const authentication = (await getAuthentication())?.authentication
        if (!authentication) return false

        const { refreshToken } = authentication

        try {
            return await setFreshAccessToken(refreshToken)
        } catch (err) {
            if (!(err instanceof ApolloError)) throw err

            const shouldRevoke = hasErrorMessage(err, [REFRESH_TOKEN_EXPIRED])
            const shouldClearAuth =
                shouldRevoke || hasErrorMessage(err, [REFRESH_TOKEN_CORRUPT])

            if (shouldRevoke)
                await Promise.all([
                    revokeRefreshToken(refreshToken),
                    AsyncStorage.removeItem('refreshToken')
                ])

            if (shouldClearAuth) clearAuthentication()
            else throw err
        }
        return false
    }

    attemptRefreshAccessToken().then((fwd) => {
        sub.next(fwd)
        sub.complete()
    })
})

export default refreshAccessTokenObservable
