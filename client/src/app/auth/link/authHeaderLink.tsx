import { setContext } from '@apollo/client/link/context'

import getAuthentication from '../graphql/queries/getAuthentication'

const authHeaderLink = setContext(async (_, prevContext) => {
    const data = await getAuthentication()

    const accessToken = data?.authentication?.accessToken
    if (!accessToken) return prevContext

    return {
        ...prevContext,
        headers: {
            ...prevContext.headers,
            Authentication: `JWT ${accessToken}`
        }
    }
})

export default authHeaderLink
