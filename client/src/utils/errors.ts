/* eslint-disable max-classes-per-file */
export default class ClientError extends Error {
    constructor(message: string = 'Client-side Error') {
        super(message)
        this.name = this.constructor.name
    }
}

export class PartialDataError extends ClientError {
    constructor() {
        super('Expected to recieve a complete GraphQL response')
    }
}
