import { Observable } from '@apollo/client'
import { onError } from '@apollo/client/link/error'
import { GraphQLError } from 'graphql'

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

const authErrorLink = onError(
    // @ts-ignore - allow for null return
    ({ graphQLErrors, response, operation, forward }) => {
        const errorObs = graphQLErrors
            ?.map(getErrorObservable)
            .find((obs) => obs !== null)

        if (errorObs) {
            return errorObs.flatMap((shouldForward) =>
                shouldForward
                    ? forward(operation)
                    : new Observable((sub) => {
                          // @ts-ignore - response is casted to ExecutionResult, which is equivalent to FetchResult
                          sub.next(response)
                          sub.complete()
                      })
            )
        }

        return null
    }
)

export default authErrorLink
