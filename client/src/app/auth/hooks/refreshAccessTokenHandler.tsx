import { ApolloError } from '@apollo/client'
import AsyncStorage from '@react-native-async-storage/async-storage'

import { hasErrorMessage } from 'utils/error'

import { REFRESH_TOKEN_EXPIRED, REFRESH_TOKEN_CORRUPT } from '../constants'
import clearAuthentication from '../graphql/mutations/clearAuthentication'
import setFreshAccessToken from '../graphql/mutations/setFreshAccessToken'

export default async function refreshAccessTokenHandler(
    refreshToken: string
): Promise<string | null> {
    try {
        return await setFreshAccessToken(refreshToken)
    } catch (err) {
        if (!(err instanceof ApolloError)) throw err

        const { graphQLErrors: errors } = err

        const shouldClearAuth = hasErrorMessage(errors, [
            REFRESH_TOKEN_EXPIRED,
            REFRESH_TOKEN_CORRUPT
        ])

        if (shouldClearAuth) {
            clearAuthentication()
            await AsyncStorage.removeItem('refreshToken')
        } else throw err
    }
    return null
}
