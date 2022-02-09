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
            },
            deleteDivision(_result, args, cache) {
                cache.invalidate({
                    __typename: 'Division',
                    id: args.id as string
                })
            },
            deletePosition(_result, args, cache) {
                cache.invalidate({
                    __typename: 'Position',
                    id: args.id as string
                })
            },
            joinOrganization(_result, _args, cache) {
                const key = cache
                    .resolve({ __typename: 'Query' }, 'me')
                    ?.toString()
                if (!key) return

                cache.invalidate(key, 'organizationPermitList')
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
