import { createGraphQLHandler } from '@miragejs/graphql'

import fullSchema from '@/apollo/fullSchema'

import resolvers from './resolvers'
import createPureMirageServer from './createPureMirageServer'
import { loadAppExtra } from '@/app/common/utils/appBuild'

export const mirageServer = createPureMirageServer(loadAppExtra().NODE_ENV)

mirageServer.post(
    '/graphql',
    createGraphQLHandler(fullSchema, mirageServer.schema, {
        context: { mirageServer },
        root: null,
        resolvers
    })
)

mirageServer.create('userType').userPermit.update({
    managerPermitList: mirageServer.createList('managerPermit', 5)
})
