import { setContext } from '@apollo/client/link/context'

import getAuthenticationTokens from '../graphql/queries/getAuthenticationTokens'

const authHeaderLink = setContext((_, prevContext) => {
    const data = getAuthenticationTokens()

    if (!data) return prevContext

    const {
        authentication: { accessToken }
    } = data

    return {
        ...prevContext,
        headers: {
            ...prevContext.headers,
            Authentication: `JWT ${accessToken}`
        }
    }
})

export default authHeaderLink
