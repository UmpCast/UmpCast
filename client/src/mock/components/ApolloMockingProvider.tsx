import { ApolloProvider } from '@apollo/client'

import apolloMockingClient, {
    ApolloMockingClientOptions
} from '../utils/apolloMockingClient'

export interface ApolloMockingProviderProps extends ApolloMockingClientOptions {
    children: JSX.Element
}

export default function ApolloMockingProvider({
    mocks,
    logging,
    children
}: ApolloMockingProviderProps) {
    const client = apolloMockingClient({ mocks, logging })

    return <ApolloProvider client={client}>{children}</ApolloProvider>
}
