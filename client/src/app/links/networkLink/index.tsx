import { onError } from '@apollo/client/link/error'

import { networkErrorVar } from 'app/cache/reactiveVars'

import { createReadableNetworkError } from './networkLinkUtils'

const networkErrorLink = onError(({ networkError }) => {
    if (networkError) {
        const readableNetworkError = createReadableNetworkError(networkError)
        networkErrorVar(readableNetworkError)
    }
})

export default networkErrorLink
