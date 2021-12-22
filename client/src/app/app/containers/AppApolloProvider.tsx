import React from 'react'
import { ApolloClient, ApolloProvider } from '@apollo/client'

import AppCache from '@/apollo/appCache'
import { loadAppExtra } from '@/app/common/utils/appBuild'

export interface AppApolloProviderProps {
    children: JSX.Element
}

export default function AppApolloProvider({
    children
}: AppApolloProviderProps) {
    const appClient = new ApolloClient({
        cache: AppCache,
        uri: `${loadAppExtra().SERVER_GRAPHQL_URL}/graphql`
    })

    return <ApolloProvider client={appClient}>{children}</ApolloProvider>
}
