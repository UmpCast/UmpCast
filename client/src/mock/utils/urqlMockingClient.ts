import { IMocks, addMocksToSchema } from '@graphql-tools/mock'
import { IResolvers } from '@graphql-tools/utils'
import { createClient, dedupExchange, cacheExchange } from 'urql'
import { executeExchange } from '@urql/exchange-execute'
import { devtoolsExchange } from '@urql/devtools'

import mockSchema from './schema'

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
