import { ApolloClient } from '@apollo/client'
import { SchemaLink } from '@apollo/client/link/schema'
import { makeExecutableSchema } from '@graphql-tools/schema'
import { IMocks, addMocksToSchema } from '@graphql-tools/mock'
import AppCache from '@/app/app/utils/appCache'
import { globalTypeDefs } from './schema'

export default function apolloMockingClient(mocks: IMocks | undefined) {
    const schema = makeExecutableSchema({ typeDefs: globalTypeDefs })

    const schemaWithMocks = addMocksToSchema({
        schema,
        mocks
    })

    return new ApolloClient({
        link: new SchemaLink({ schema: schemaWithMocks }),
        cache: AppCache
    })
}
