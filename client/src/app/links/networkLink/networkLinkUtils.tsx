import NetworkError, {
    SERVER_ERROR,
    UNKNOWN_ERROR
} from '../models/networkError'

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
