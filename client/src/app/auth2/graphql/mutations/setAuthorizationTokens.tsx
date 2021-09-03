import { gql } from '@apollo/client'

import baseClient from 'apollo/baseClient'

import { SetAuthorizationTokens } from './__generated__/SetAuthorizationTokens'

export const SET_AUTHORIZATION_TOKENS = gql`
    query SetAuthorizationTokens {
        authorization @client {
            refreshToken
            accessToken
        }
    }
`

export default async function setAuthorizationTokens(
    refreshToken: string,
    accessToken: string
): Promise<void> {
    baseClient.writeQuery<SetAuthorizationTokens>({
        query: SET_AUTHORIZATION_TOKENS,
        data: {
            authorization: {
                __typename: 'Authorization',
                refreshToken,
                accessToken
            }
        }
    })
}
