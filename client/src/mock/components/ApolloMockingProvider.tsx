import { ApolloProvider } from '@apollo/client'

import apolloMockingClient, {
    ApolloMockingClientOptions
} from '../utils/apolloMockingClient'

export interface ApolloMockingProviderProps extends ApolloMockingClientOptions {
    children: JSX.Element
}

export default function ApolloMockingProvider({
    children,
    ...rest
}: ApolloMockingProviderProps) {
    const client = apolloMockingClient(rest)

    return <ApolloProvider client={client}>{children}</ApolloProvider>
}
