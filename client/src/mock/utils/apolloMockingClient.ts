import { ApolloClient, ApolloLink, from } from '@apollo/client'
import { SchemaLink } from '@apollo/client/link/schema'
import { makeExecutableSchema } from '@graphql-tools/schema'
import { IMocks, addMocksToSchema } from '@graphql-tools/mock'
import AppCache from '@/app/app/utils/appCache'
import { globalTypeDefs } from './schema'
import { getGqlString } from './graphql'

export const loggingLink = new ApolloLink((operation, forward) => {
    // eslint-disable-next-line no-console
    console.log(getGqlString(operation.query))
    return forward(operation)
})

export interface ApolloMockingClientOptions {
    mocks: IMocks | undefined
    logging?: boolean
}

export default function apolloMockingClient({
    mocks = undefined,
    logging = false
}: ApolloMockingClientOptions) {
    const schema = makeExecutableSchema({ typeDefs: globalTypeDefs })

    const schemaWithMocks = addMocksToSchema({
        schema,
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
