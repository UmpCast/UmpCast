import { gql } from '@apollo/client'

import { PartialDataError } from 'global/errors'
import { authTokenVar } from 'global/reactiveVars'
import { BaseClient } from 'utils/fetch'

import { TokenAuth, TokenAuthVariables } from './__generated__/TokenAuth'

export const TOKEN_AUTH = gql`
    mutation TokenAuth($email: String!, $password: String!) {
        tokenAuth(email: $email, password: $password) {
            token
            payload
            refreshExpiresIn
            refreshToken
        }
    }
`

export default async function createAuth(
    fields: TokenAuthVariables
): Promise<void> {
    const { data } = await BaseClient.mutate<TokenAuth, TokenAuthVariables>({
        mutation: TOKEN_AUTH,
        variables: fields
    })

    if (!data?.tokenAuth) throw new PartialDataError()

    const {
        token,
        payload: { exp },
        refreshToken: refreshTokenValue
    } = data.tokenAuth

    const refreshToken = {
        token: refreshTokenValue
    }

    const accessToken = {
        token,
        exp
    }

    authTokenVar({
        refreshToken,
        accessToken
    })
}
