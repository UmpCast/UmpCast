import ClientError from 'global/errors'

export class AuthTokenNotFoundError extends ClientError {
    constructor() {
        super('Expected auth token to be defined for this operation')
    }
}
