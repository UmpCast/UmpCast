export default interface NetworkError {
    name: string
    message: string
}

export const SERVER_ERROR: NetworkError = {
    name: 'Server Error',
    message: 'sorry, try again later'
}

export const UNKNOWN_ERROR: NetworkError = {
    name: 'Server Error',
    message: 'sorry, try again later'
}
