import { makeExecutableSchema } from '@graphql-tools/schema'
import { addMocksToSchema, IMocks } from '@graphql-tools/mock'
import { ApolloClient, ApolloProvider } from '@apollo/client'
import { SchemaLink } from '@apollo/client/link/schema'
import React from 'react'
import AppCache from '@/app/common/utils/appCache'
import { globalTypeDefs } from '../utils/schema'

export interface ApolloMockingProviderProps {
    mocks?: IMocks | undefined
    children: JSX.Element
}

export default function ApolloMockingProvider({
    mocks = undefined,
    children
}: ApolloMockingProviderProps) {
    const schema = makeExecutableSchema({ typeDefs: globalTypeDefs })

    const schemaWithMocks = addMocksToSchema({
        schema,
        mocks
    })

    const client = new ApolloClient({
        link: new SchemaLink({ schema: schemaWithMocks }),
        cache: AppCache
    })

    return <ApolloProvider client={client}>{children}</ApolloProvider>
}
