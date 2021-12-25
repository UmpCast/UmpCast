import React from 'react'
import { NativeBaseProvider } from 'native-base'
import { ApolloProvider } from '@apollo/client'
import { NavigationContainer } from '@react-navigation/native'
import apolloAppClient from '../utils/apolloAppClient'
import appNavLinking from '../utils/appNavLinking'

export interface ProviderProps {
    children: JSX.Element
}

export function AppApolloProvider({ children }: ProviderProps) {
    return <ApolloProvider client={apolloAppClient}>{children}</ApolloProvider>
}

export function AppNavigationContainer({ children }: ProviderProps) {
    return (
        <NavigationContainer linking={appNavLinking}>
            {children}
        </NavigationContainer>
    )
}

export default function AppProvider({ children }: ProviderProps) {
    return (
        <AppApolloProvider>
            <NativeBaseProvider>
                <AppNavigationContainer>{children}</AppNavigationContainer>
            </NativeBaseProvider>
        </AppApolloProvider>
    )
}
