import { setContext } from '@apollo/client/link/context'
import getAuthorizationTokens from '../graphql/queries/getAuthorizationTokens'

const authHeaderLink = setContext((_, prevContext) => {
    const data = getAuthorizationTokens()

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
