import { gql } from "@apollo/client";
import { authTokenVar } from "app/cache";
import { BaseClient } from "utils/fetch";

export const REVOKE_TOKEN = gql`
    mutation RevokeToken ($refreshToken: String!) {
        revokeToken (refreshToken: $refreshToken) {
            revoked
        }
    }
`

export default function resetAuth (): void {
    const authToken = authTokenVar()
    if (authToken === null) return

    authTokenVar(null)

    BaseClient.mutate({
        mutation: REVOKE_TOKEN,
        variables: {
            refreshToken: authToken.token
        }
    })
}