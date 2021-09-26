import { gql } from '@apollo/client'

import BaseClient from 'apollo/baseClient'

import { GetAuthenticationTokens } from './__generated__/GetAuthenticationTokens'

export const GET_AUTHORIZATION_TOKENS = gql`
    query GetAuthenticationTokens {
        authentication @client {
            refreshToken
            accessToken
        }
    }
`

export default function getAuthenticationTokens() {
    return BaseClient().readQuery<GetAuthenticationTokens>({
        query: GET_AUTHORIZATION_TOKENS
    })
}
