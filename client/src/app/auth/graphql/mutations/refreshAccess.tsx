import { gql } from '@apollo/client'

import { PartialDataError } from 'utils/errors'
import { BaseClient } from 'utils/fetch'

import { SessionToken } from '../../models/token'
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

export default async function refreshAccess(
    refreshToken: SessionToken
): Promise<SessionToken> {
    const { data } = await BaseClient.mutate<
        RefreshAccessToken,
        RefreshAccessTokenVariables
    >({
        mutation: REFRESH_ACCESS_TOKEN,
        variables: {
            refreshToken: refreshToken.token
        }
    })

    if (!data?.refreshToken) throw new PartialDataError()

    const {
        token,
        payload: { exp }
    } = data.refreshToken

    const accessToken = {
        token,
        exp
    }

    return accessToken
}
