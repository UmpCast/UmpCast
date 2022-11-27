import { IMocks, addMocksToSchema } from '@graphql-tools/mock'
import { IResolvers } from '@graphql-tools/utils'
import { devtoolsExchange } from '@urql/devtools'
import { executeExchange } from '@urql/exchange-execute'
import { createClient } from 'urql'

import { graphCacheExchange } from '@/config/urql/graphCache'
import { expoExtra } from '@/utils/expo'

import { clientSchema } from './execSchema'

export interface CreateMockClientOptions {
    mocks?: IMocks
    resolvers?: IResolvers
    withDevTools?: boolean
}

export default function createMockClient({
    mocks = undefined,
    resolvers = undefined,
    withDevTools = false
}: CreateMockClientOptions = {}) {
    const schemaWithMocks = addMocksToSchema({
        schema: clientSchema,
        mocks,
        resolvers
    })

    const exchanges = []

    exchanges.push(graphCacheExchange)

    if (withDevTools) exchanges.push(devtoolsExchange)

    exchanges.push(
        executeExchange({
            schema: schemaWithMocks
        })
    )

    return createClient({
        url: '/graphql',
        exchanges,
        requestPolicy: 'cache-and-network'
    })
}
