import { useEffect, useState } from 'react'

import { ApolloError } from '@apollo/client'
import AsyncStorage from '@react-native-async-storage/async-storage'

import { hasErrorMessage } from 'utils/error'

import { REFRESH_TOKEN_EXPIRED } from '../constants'
import getFreshAccessToken from '../graphql/mutations/getFreshAccessToken'
import revokeRefreshToken from '../graphql/mutations/revokeToken'
import setAuthenticationTokens from '../graphql/mutations/setAuthenticationTokens'

export const restoreAuthentication = async () => {
    const refreshToken = await AsyncStorage.getItem('refreshToken')

    if (refreshToken !== null) {
        try {
            const { data } = await getFreshAccessToken(refreshToken)
            if (data?.refreshToken)
                setAuthenticationTokens(refreshToken, data.refreshToken.token)
        } catch (err) {
            if (!(err instanceof ApolloError)) throw err

            if (hasErrorMessage(err, [REFRESH_TOKEN_EXPIRED])) {
                await Promise.allSettled([
                    revokeRefreshToken(refreshToken),
                    AsyncStorage.removeItem('refreshToken')
                ])
            } else {
                throw err
            }
        }
    }
}

const useInitializedAuth = () => {
    const [initialized, setInitialized] = useState(false)

    useEffect(() => {
        restoreAuthentication().finally(() => setInitialized(true))
    }, [])

    return initialized
}

export default useInitializedAuth
