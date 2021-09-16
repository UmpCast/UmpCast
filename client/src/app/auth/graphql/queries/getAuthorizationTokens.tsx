import { gql } from '@apollo/client'
import baseClient from 'apollo/baseClient'
import { GetAuthorizationTokens } from './__generated__/GetAuthorizationTokens'

export const GET_AUTHORIZATION_TOKENS = gql`
    query GetAuthorizationTokens {
        authorization @client {
            refreshToken
            accessToken
        }
    }
`

export default function getAuthorizationTokens () {
    return baseClient.readQuery<GetAuthorizationTokens>({
        query: GET_AUTHORIZATION_TOKENS
    })
}