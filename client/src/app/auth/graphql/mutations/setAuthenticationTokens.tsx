import { gql } from '@apollo/client'
import AsyncStorage from '@react-native-async-storage/async-storage'

import BaseClient from 'apollo/baseClient'

import { SetAuthenticationTokens } from './__generated__/SetAuthenticationTokens'

export const SET_AUTHORIZATION_TOKENS = gql`
    query SetAuthenticationTokens {
        authentication @client {
            refreshToken
            accessToken
        }
    }
`

export default async function setAuthenticationTokens(
    refreshToken: string,
    accessToken: string
): Promise<void> {
    BaseClient().writeQuery<SetAuthenticationTokens>({
        query: SET_AUTHORIZATION_TOKENS,
        data: {
            authentication: {
                __typename: 'Authentication',
                refreshToken,
                accessToken
            }
        }
    })

    await AsyncStorage.setItem('refreshToken', refreshToken)
}
