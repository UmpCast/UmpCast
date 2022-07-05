import { IMocks, addMocksToSchema } from '@graphql-tools/mock'
import { IResolvers } from '@graphql-tools/utils'
import { devtoolsExchange } from '@urql/devtools'
import { executeExchange } from '@urql/exchange-execute'
import { createClient } from 'urql'

import { loadAppExtra } from '@/utils/expo'

import { clientSchema } from '../schema'

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
        schema: clientSchema,
        mocks,
        resolvers
    })

    const exchanges = []

    if (withDevTools) exchanges.push(devtoolsExchange)
    exchanges.push(
        ...[
            executeExchange({
                schema: schemaWithMocks
            })
        ]
    )

    return createClient({
        url: '/graphql',
        exchanges,
        requestPolicy: 'cache-and-network'
    })
}
