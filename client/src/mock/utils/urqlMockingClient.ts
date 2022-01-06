import { IMocks, addMocksToSchema } from '@graphql-tools/mock'
import { IResolvers } from '@graphql-tools/utils'
import { createClient, dedupExchange, cacheExchange } from 'urql'
import { executeExchange } from '@urql/exchange-execute'

import mockSchema from './schema'

export interface UrqlMockingClientOptions {
    mocks?: IMocks | undefined
    resolvers?: IResolvers
    logging?: boolean
}

export default function urqlMockingClient({
    mocks = undefined,
    resolvers = undefined,
    logging = false
}: UrqlMockingClientOptions = {}) {
    const schemaWithMocks = addMocksToSchema({
        schema: mockSchema,
        mocks,
        resolvers
    })

    return createClient({
        url: '/graphql',
        exchanges: [
            dedupExchange,
            cacheExchange,
            executeExchange({
                schema: schemaWithMocks
            })
        ]
    })
}
