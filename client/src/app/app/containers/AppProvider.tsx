import React from 'react'
import { NativeBaseProvider } from 'native-base'
import AppApolloProvider from './AppApolloProvider'
import AppNavigationContainer from './AppNavigationContainer'

export interface AppProviderProps {
    children: JSX.Element
}

export default function AppProvider({ children }: AppProviderProps) {
    return (
        <AppApolloProvider>
            <NativeBaseProvider>
                <AppNavigationContainer>{children}</AppNavigationContainer>
            </NativeBaseProvider>
        </AppApolloProvider>
    )
}
