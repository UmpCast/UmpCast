import { gql } from '@apollo/client'

import { authTokenVar } from 'global/reactiveVars'
import { BaseClient } from 'utils/fetch'

export const REVOKE_TOKEN = gql`
    mutation RevokeToken($refreshToken: String!) {
        revokeToken(refreshToken: $refreshToken) {
            revoked
        }
    }
`
export default async function resetAuth(): Promise<void> {
    const authToken = authTokenVar()
    if (!authToken) return

    authTokenVar(null)

    await BaseClient.mutate({
        mutation: REVOKE_TOKEN,
        variables: {
            refreshToken: authToken.refreshToken.token
        }
    })
}
