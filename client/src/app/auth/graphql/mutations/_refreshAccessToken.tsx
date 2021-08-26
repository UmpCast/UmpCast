import { gql } from '@apollo/client'

import { AccessToken } from 'app/auth/models/token'
import { BaseClient } from 'global/client'
import { PartialDataError } from 'global/errors'

import {
    RefreshAccessToken,
    RefreshAccessTokenVariables
} from './__generated__/RefreshAccessToken'

const REFRESH_ACCESS_TOKEN = gql`
    mutation RefreshAccessToken($refreshToken: String) {
        refreshToken(refreshToken: $refreshToken) {
            token
            payload
        }
    }
`

export default async function refreshAccessToken(
    refreshToken: string
): Promise<AccessToken> {
    const { data } = await BaseClient.mutate<
        RefreshAccessToken,
        RefreshAccessTokenVariables
    >({
        mutation: REFRESH_ACCESS_TOKEN,
        variables: {
            refreshToken
        }
    })

    if (!data?.refreshToken) throw new PartialDataError()

    const {
        token,
        payload: { exp }
    } = data.refreshToken

    return {
        token,
        exp
    }
}
