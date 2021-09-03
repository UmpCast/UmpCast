import { gql } from '@apollo/client'

export const GET_AUTHORIZATION_TOKENS = gql`
    query GetAuthorizationTokens {
        authorization @client {
            refreshToken
            accessToken
        }
    }
`
