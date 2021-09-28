import { ApolloError } from '@apollo/client'
import AsyncStorage from '@react-native-async-storage/async-storage'

import { hasErrorMessage } from 'utils/error'

import { REFRESH_TOKEN_EXPIRED, REFRESH_TOKEN_CORRUPT } from '../constants'
import clearAuthentication from '../graphql/mutations/clearAuthentication'
import revokeRefreshToken from '../graphql/mutations/revokeRefreshToken'
import setFreshAccessToken from '../graphql/mutations/setFreshAccessToken'
import getAuthentication from '../graphql/queries/getAuthentication'

export default async function refreshAccessTokenHandler(): Promise<
    string | null
> {
    const authentication = (await getAuthentication())?.authentication
    if (!authentication) return null

    const { refreshToken } = authentication

    try {
        return await setFreshAccessToken(refreshToken)
    } catch (err) {
        if (!(err instanceof ApolloError)) throw err

        const { graphQLErrors: errors } = err

        const shouldRevoke = hasErrorMessage(errors, [REFRESH_TOKEN_EXPIRED])

        const shouldClearAuth =
            shouldRevoke || hasErrorMessage(errors, [REFRESH_TOKEN_CORRUPT])

        if (shouldRevoke)
            await Promise.all([
                revokeRefreshToken(refreshToken),
                AsyncStorage.removeItem('refreshToken')
            ])

        if (shouldClearAuth) clearAuthentication()
        else throw err
    }
    return null
}
