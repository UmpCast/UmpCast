import { appCacheExchange } from '@/exchanges'
import { IMocks, addMocksToSchema } from '@graphql-tools/mock'
import { IResolvers } from '@graphql-tools/utils'
import { devtoolsExchange } from '@urql/devtools'
import { executeExchange } from '@urql/exchange-execute'
import { createClient, dedupExchange } from 'urql'

import { mockSchema } from './graphql'

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
            appCacheExchange,
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
