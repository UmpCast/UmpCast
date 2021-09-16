import { gql, FetchResult } from '@apollo/client'

import baseClient from 'apollo/baseClient'

import {
    GetFreshAccessToken,
    GetFreshAccessTokenVariables
} from './__generated__/GetFreshAccessToken'

export const GET_FRESH_ACCESS_TOKEN = gql`
    mutation GetFreshAccessToken($refreshToken: String) {
        refreshToken(refreshToken: $refreshToken) {
            token
        }
    }
`

export default async function getFreshAccessToken(
    refreshToken: string
): Promise<FetchResult<GetFreshAccessToken>> {
    return baseClient.mutate<
        GetFreshAccessToken,
        GetFreshAccessTokenVariables
    >({
        mutation: GET_FRESH_ACCESS_TOKEN,
        variables: {
            refreshToken
        }
    })
}
