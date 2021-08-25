import { onError } from '@apollo/client/link/error'

import { networkErrorVar } from 'app/cache/reactiveVars'
import NetworkError from 'app/overlay/models/networkError'

export const createReadableNetworkError = (
    networkError: NetworkError
): NetworkError => {
    switch (networkError.name) {
        case 'ServerError':
            return {
                name: 'Server Error',
                message: 'sorry, try again later'
            }
        default:
            return {
                name: 'Unknown Error',
                message: 'something unexpected occured'
            }
    }
}

const networkErrorLink = onError(({ networkError }) => {
    console.dir(networkError)
    if (networkError) {
        const readableNetworkError = createReadableNetworkError(networkError)
        networkErrorVar(readableNetworkError)
    }
})

export default networkErrorLink
