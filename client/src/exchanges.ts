import { authExchange } from '@urql/exchange-auth'
import { cacheExchange } from '@urql/exchange-graphcache'
import { getAuth } from 'firebase/auth'
import { makeOperation } from 'urql'

export const appCacheExchange = cacheExchange({
    updates: {
        Mutation: {
            register(_result, _args, cache) {
                cache.invalidate({
                    __typename: 'Query',
                    id: 'isRegistered'
                })
            }
        }
    }
})

export const appAuthExchange = authExchange<string>({
    addAuthToOperation: ({ authState: idToken, operation }) => {
        if (!idToken) return operation

        const fetchOptions =
            typeof operation.context.fetchOptions === 'function'
                ? operation.context.fetchOptions()
                : operation.context.fetchOptions || {}

        return makeOperation(operation.kind, operation, {
            ...operation.context,
            fetchOptions: {
                ...fetchOptions,
                headers: {
                    ...fetchOptions.headers,
                    Authorization: idToken
                }
            }
        })
    },
    getAuth: async () => getAuth().currentUser?.getIdToken() ?? null
})
