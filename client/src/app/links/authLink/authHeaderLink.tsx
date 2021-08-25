import { setContext } from '@apollo/client/link/context'

import { authTokenVar } from 'app/cache/reactiveVars'

const authHeaderLink = setContext((_, prevContext) => {
    const authToken = authTokenVar()
    if (!authToken) return prevContext

    return {
        ...prevContext,
        headers: {
            ...prevContext.headers,
            Authorization: `JWT ${authToken.accessToken.token}`
        }
    }
})

export default authHeaderLink