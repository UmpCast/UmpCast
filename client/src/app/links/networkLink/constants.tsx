import NetworkError from '../models/networkError'

export const SERVER_ERROR_NAME = 'ServerError'
export const SERVER_ERROR: NetworkError = {
    name: 'Server Error',
    message: 'sorry, try again later'
}

export const UNKNOWN_ERROR: NetworkError = {
    name: 'Server Error',
    message: 'sorry, try again later'
}
