import { Observable } from '@apollo/client'
import { onError } from '@apollo/client/link/error'

import { ACCESS_TOKEN_EXPIRED, CORRUPT_ACCESS_TOKEN } from 'app/auth/constants'
import resetAuth from 'app/auth/graphql/mutations/resetAuth'

import handleAccessTokenExpired from './handleAccessTokenExpired'

const authErrorLink = onError(({ graphQLErrors, operation, forward }) => {
    for (const err of graphQLErrors || []) {
        switch (err.message) {
            case ACCESS_TOKEN_EXPIRED:
                return new Observable<boolean>((sub) => {
                    handleAccessTokenExpired().then((handled) => {
                        if (!handled) resetAuth()
                        if (!sub.closed) {
                            sub.next(handled)
                            sub.complete()
                        }
                    })
                }).flatMap((shouldForward) =>
                    shouldForward ? forward(operation) : Observable.of()
                )

            case CORRUPT_ACCESS_TOKEN:
                return new Observable((sub) => {
                    resetAuth().then(() => {
                        if (!sub.closed) {
                            sub.complete()
                        }
                    })
                }).flatMap(() => Observable.of())
            default:
                break
        }
    }

    return Observable.of()
})

export default authErrorLink
