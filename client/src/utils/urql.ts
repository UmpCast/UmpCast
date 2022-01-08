import { authExchange } from '@urql/exchange-auth'
import { getAuth } from 'firebase/auth'
import { makeOperation } from 'urql'
import { IMocks, addMocksToSchema } from '@graphql-tools/mock'
import { IResolvers } from '@graphql-tools/utils'
import { createClient, dedupExchange, cacheExchange } from 'urql'
import { executeExchange } from '@urql/exchange-execute'
import { devtoolsExchange } from '@urql/devtools'
import { mockSchema } from './graphql'

export const firebaseAuthExchange = authExchange<string>({
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

export interface UrqlMockingClientOptions {
    mocks?: IMocks
    resolvers?: IResolvers
    withDevTools?: boolean
}

export default function urqlMockingClient({
    mocks = undefined,
    resolvers = undefined,
    withDevTools = false
}: UrqlMockingClientOptions = {}) {
    const schemaWithMocks = addMocksToSchema({
        schema: mockSchema,
        mocks,
        resolvers
    })

    const exchanges = []

    if (withDevTools) exchanges.push(devtoolsExchange)
    exchanges.push(
        ...[
            dedupExchange,
            cacheExchange,
            executeExchange({
                schema: schemaWithMocks
            })
        ]
    )

    return createClient({
        url: '/graphql',
        exchanges
    })
}
