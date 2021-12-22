import React from 'react'
import { ApolloProvider } from '@apollo/client'

import appApolloClient from '../utils/appApolloClient'

export interface AppApolloProviderProps {
    children: JSX.Element
}

export default function AppApolloProvider({
    children
}: AppApolloProviderProps) {
    return <ApolloProvider client={appApolloClient}>{children}</ApolloProvider>
}
