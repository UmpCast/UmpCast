import { ApolloClient, ApolloLink, from } from '@apollo/client'
import { SchemaLink } from '@apollo/client/link/schema'
import { IMocks, addMocksToSchema } from '@graphql-tools/mock'
import AppCache from '@/app/app/utils/appCache'
import { getGqlString } from './graphql'
import mockSchema from './schema'

export const loggingLink = new ApolloLink((operation, forward) => {
    // eslint-disable-next-line no-console
    console.log(getGqlString(operation.query))
    return forward(operation)
})

export interface ApolloMockingClientOptions {
    mocks?: IMocks | undefined
    logging?: boolean
}

export default function apolloMockingClient({
    mocks = undefined,
    logging = false
}: ApolloMockingClientOptions = {}) {
    const schemaWithMocks = addMocksToSchema({
        schema: mockSchema,
        mocks
    })

    const links = []

    if (logging) links.push(loggingLink)
    links.push(new SchemaLink({ schema: schemaWithMocks }))

    return new ApolloClient({
        link: from(links),
        cache: AppCache
    })
}
