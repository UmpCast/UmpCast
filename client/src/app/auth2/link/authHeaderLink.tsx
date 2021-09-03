import { setContext } from '@apollo/client/link/context'

import baseClient from 'apollo/baseClient'

import { GetAuthorizationTokens } from '../graphql/queries/__generated__/GetAuthorizationTokens'
import { GET_AUTHORIZATION_TOKENS } from '../graphql/queries/getAuthorizationTokens'

const authHeaderLink = setContext((_, prevContext) => {
    const data = baseClient.readQuery<GetAuthorizationTokens>({
        query: GET_AUTHORIZATION_TOKENS
    })

    if (!data) return prevContext

    const {
        authorization: { accessToken }
    } = data

    return {
        ...prevContext,
        headers: {
            ...prevContext.headers,
            Authorization: `JWT ${accessToken}`
        }
    }
})

export default authHeaderLink
