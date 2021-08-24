import { Observable } from '@apollo/client'
import { onError } from '@apollo/client/link/error'

import { ACCESS_TOKEN_EXPIRED } from 'app/auth/constants'
import refreshAuthAccess from 'app/auth/graphql/mutations/refreshAuthAccess'
import resetAuth from 'app/auth/graphql/mutations/resetAuth'

const authErrorLink = onError(({ graphQLErrors, operation, forward }) => {
    for (const err of graphQLErrors || []) {
        switch (err.message) {
            case ACCESS_TOKEN_EXPIRED:
                return new Observable<boolean>((sub) => {
                    refreshAuthAccess().then((handled) => {
                        if (!handled) resetAuth()
                        if (!sub.closed) {
                            sub.next(handled)
                            sub.complete()
                        }
                    })
                }).flatMap((shouldForward) =>
                    shouldForward ? forward(operation) : Observable.of()
                )
            default:
                break
        }
    }

    return Observable.of()
})

export default authErrorLink
