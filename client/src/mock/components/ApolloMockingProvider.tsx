import { IMocks } from '@graphql-tools/mock'
import { ApolloProvider } from '@apollo/client'
import React from 'react'
import apolloMockingClient from '../utils/apolloMockingClient'

export interface ApolloMockingProviderProps {
    mocks?: IMocks | undefined
    children: JSX.Element
}

export default function ApolloMockingProvider({
    mocks = undefined,
    children
}: ApolloMockingProviderProps) {
    const client = apolloMockingClient(mocks)

    return <ApolloProvider client={client}>{children}</ApolloProvider>
}
