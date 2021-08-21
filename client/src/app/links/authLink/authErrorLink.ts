import { Observable } from '@apollo/client'
import { onError } from '@apollo/client/link/error'

import refreshAccess from 'app/auth/graphql/mutations/createAccess'
import resetAuth from 'app/auth/graphql/mutations/resetAuth'
import setAuth from 'app/auth/graphql/mutations/setAuth'
import getAuth from 'app/auth/graphql/queries/getAuth'
import { REFRESH_TOKEN_EXPIRED } from 'utils/errors'

import * as m from './authErrorLink'

export const handleExpiredSignature = async (): Promise<boolean> => {
  const authToken = getAuth()
  if (!authToken) return false

  try {
    const accessToken = await refreshAccess(authToken)

    setAuth({
      ...authToken,
      accessToken,
    })
  } catch (err) {
    if (err.message !== REFRESH_TOKEN_EXPIRED) throw err
    return false
  }

  return true
}

const authErrorLink = onError(({ graphQLErrors, operation, forward }) => {
  for (const err of graphQLErrors || []) {
    switch (err.message) {
      case 'Signature has expired':
        return new Observable<boolean>((sub) => {
          m.handleExpiredSignature()
            .then((handled) => {
              if (!handled) resetAuth()
              if (!sub.closed) {
                sub.next(handled)
                sub.complete()
              }
            })
        }).flatMap((shouldForward) => (shouldForward ? forward(operation) : Observable.of()))

      case 'Error decoding signature':
        return new Observable((sub) => {
          resetAuth()
            .then(sub.complete)
        }).flatMap(() => Observable.of())
      default:
        break
    }
  }

  return Observable.of()
})

export default authErrorLink
