import { ApolloProvider } from '@apollo/client'

import apolloAppClient from '../utils/apolloAppClient'

export interface ApolloAppProviderProps {
    children: JSX.Element
}

export function ApolloAppProvider({ children }: ApolloAppProviderProps) {
    return <ApolloProvider client={apolloAppClient}>{children}</ApolloProvider>
}
