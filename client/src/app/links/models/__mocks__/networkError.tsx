import NetworkError from '../networkError'

export const MockServerError: NetworkError = {
    name: 'ServerError',
    message: 'some server error occured'
}

export const MockReadableError: NetworkError = {
    name: 'Readable Error',
    message: 'this message is readable'
}

export const MockUnknownError: NetworkError = {
    name: 'Unknown Error',
    message: 'this message is borke'
}
