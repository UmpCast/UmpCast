import { useEffect, useState } from 'react'

import { ApolloError } from '@apollo/client'
import AsyncStorage from '@react-native-async-storage/async-storage'

import { hasErrorMessage } from 'utils/error'

import { REFRESH_TOKEN_EXPIRED } from '../constants'
import revokeRefreshToken from '../graphql/mutations/revokeRefreshToken'
import setFreshAccessToken from '../graphql/mutations/setFreshAccessToken'

export const restoreAuthentication = async () => {
    const refreshToken = await AsyncStorage.getItem('refreshToken')

    if (refreshToken !== null) {
        try {
            await setFreshAccessToken(refreshToken)
        } catch (err) {
            if (!(err instanceof ApolloError)) throw err

            if (hasErrorMessage(err, [REFRESH_TOKEN_EXPIRED])) {
                await Promise.all([
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
