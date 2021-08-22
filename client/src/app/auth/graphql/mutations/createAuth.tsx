import { gql } from '@apollo/client'

import { AuthToken } from 'app/auth/models/token'
import { PartialDataError } from 'utils/errors'
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
  fields: TokenAuthVariables,
): Promise<AuthToken | null> {
  const { data } = await BaseClient.mutate<
        TokenAuth,
        TokenAuthVariables
    >({
      mutation: TOKEN_AUTH,
      variables: fields,
    })
  if (!data?.tokenAuth) throw new PartialDataError()

  const {
    token,
    payload: { exp },
    refreshExpiresIn,
    refreshToken: refreshTokenValue,
  } = data.tokenAuth

  const refreshToken = {
    token: refreshTokenValue,
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
