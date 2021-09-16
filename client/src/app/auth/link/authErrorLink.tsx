import { onError } from '@apollo/client/link/error'
import { GraphQLError } from 'graphql'
import Observable from 'zen-observable'

import { ErrorObservable } from '../authUtils'
import { ACCESS_TOKEN_EXPIRED } from '../constants'
import refreshAccessTokenObservable from '../observables/refreshAccessToken'

export function getErrorObservable(err: GraphQLError): ErrorObservable | null {
    switch (err.message) {
        case ACCESS_TOKEN_EXPIRED:
            return refreshAccessTokenObservable
        default:
            return null
    }
}

const authErrorLink = onError(({ graphQLErrors, operation, forward }) => {
    const errorObs = graphQLErrors
        ?.map(getErrorObservable)
        .find((obs) => obs !== null)

    return errorObs
        ? errorObs.flatMap((shouldForward) =>
              shouldForward ? forward(operation) : Observable.of()
          )
        : Observable.of()
})

export default authErrorLink
