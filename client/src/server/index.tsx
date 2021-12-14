// @ts-nocheck

import { createGraphQLHandler } from '@miragejs/graphql'

import fullSchema from '@/apollo/fullSchema'

import resolvers from './resolver'
import createAppServer from './createAppServer'

export default function startMirage({ environment = 'development' } = {}) {
    const server = createAppServer(environment)

    server.post(
        '/graphql',
        createGraphQLHandler(fullSchema, server.schema, {
            context: { mirageServer: server },
            root: null,
            resolvers
        })
    )

    return server
}
