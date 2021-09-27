import { gql } from '@apollo/client'

import { authenticationVar } from 'apollo/appCache'
import BaseClient from 'apollo/baseClient'

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

export default async function setFreshAccessToken(
    refreshToken: string
): Promise<boolean> {
    const { data } = await BaseClient().mutate<
        GetFreshAccessToken,
        GetFreshAccessTokenVariables
    >({
        mutation: GET_FRESH_ACCESS_TOKEN,
        variables: {
            refreshToken
        }
    })

    const accessToken = data?.refreshToken?.token

    if (accessToken) {
        authenticationVar({
            refreshToken,
            accessToken
        })

        return true
    }

    return false
}
