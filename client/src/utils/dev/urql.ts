import { IMocks, addMocksToSchema } from '@graphql-tools/mock'
import { IResolvers } from '@graphql-tools/utils'
import { devtoolsExchange } from '@urql/devtools'
import { executeExchange } from '@urql/exchange-execute'
import { createClient, dedupExchange } from 'urql'

import { appCacheExchange } from '@/exchanges'
import { mockSchema } from '@/utils/dev/graphql'

import { loadAppExtra } from '../expo'

const isDevelopment = loadAppExtra().NODE_ENV === 'development'

export interface CreateMockClientOptions {
    mocks?: IMocks
    resolvers?: IResolvers
    withDevTools?: boolean
}

export default function createMockClient({
    mocks = undefined,
    resolvers = undefined,
    withDevTools = isDevelopment
}: CreateMockClientOptions = {}) {
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
