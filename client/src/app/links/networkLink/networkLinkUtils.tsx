import NetworkError from '../models/networkError'
import { SERVER_ERROR, UNKNOWN_ERROR } from './constants'

export const createReadableNetworkError = (
    networkError: NetworkError
): NetworkError => {
    switch (networkError.name) {
        case 'ServerError':
            return SERVER_ERROR
        default:
            return UNKNOWN_ERROR
    }
}
