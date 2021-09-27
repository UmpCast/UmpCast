import { gql } from '@apollo/client'

import BaseClient from 'apollo/baseClient'

export const REVOKE_REFRESH_TOKEN = gql`
    mutation RevokeRefreshToken($refreshToken: String!) {
        revokeToken(refreshToken: $refreshToken) {
            revoked
        }
    }
`

export default async function revokeRefreshToken(
    refreshToken: string
): Promise<void> {
    await BaseClient().mutate({
        mutation: REVOKE_REFRESH_TOKEN,
        variables: {
            refreshToken
        }
    })
}
