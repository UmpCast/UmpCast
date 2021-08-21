import { gql } from '@apollo/client'

import { AuthToken } from 'app/auth/models/token'
import { TokenAuthVariables, TokenAuth_tokenAuth } from 'generated/TokenAuth'
import { BaseClient } from 'utils/fetch'

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
  fields: TokenAuthVariables,
): Promise<AuthToken | null> {
  const { data } = await BaseClient.mutate<
        TokenAuth_tokenAuth,
        TokenAuthVariables
    >({
      mutation: TOKEN_AUTH,
      variables: fields,
    })
  if (!data) return null

  const {
    token,
    payload: { exp },
    refreshExpiresIn,
    refreshToken: refresh_token,
  } = data

  const refreshToken = {
    token: refresh_token,
    exp: refreshExpiresIn,
  }

  const accessToken = {
    token,
    exp,
  }

  return {
    ...refreshToken,
    accessToken,
  }
}
