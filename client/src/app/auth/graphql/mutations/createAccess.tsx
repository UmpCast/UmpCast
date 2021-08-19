import { gql } from "@apollo/client"
import { SessionToken } from "../../models/token"
import {
    GetAccessToken_refreshToken,
    GetAccessTokenVariables
} from "generated/GetAccessToken"
import { BaseClient } from "utils/fetch"

const GET_ACCESS_TOKEN = gql`
    mutation GetAccessToken($refreshToken: String) {
        refreshToken(refreshToken: $refreshToken) {
            token
            payload
        }
    }
`

export default async function createAccess(
    refreshToken: SessionToken
): Promise<SessionToken | null> {
    const { data } = await BaseClient.mutate<
        GetAccessToken_refreshToken,
        GetAccessTokenVariables
    >({
        mutation: GET_ACCESS_TOKEN,
        variables: {
            refreshToken: refreshToken.token
        }
    })

    if (!data) return null

    const {
        token,
        payload: { exp }
    } = data

    const accessToken = {
        token,
        exp
    }

    return accessToken
}
