import React from 'react'
import { NativeBaseProvider } from 'native-base'
import AppNavigationContainer from './AppNavigationContainer'
import { ApolloAppProvider } from './ApolloAppProvider'

export interface AppProviderProps {
    children: JSX.Element
}

export default function AppProvider({ children }: AppProviderProps) {
    return (
        <ApolloAppProvider>
            <NativeBaseProvider>
                <AppNavigationContainer>{children}</AppNavigationContainer>
            </NativeBaseProvider>
        </ApolloAppProvider>
    )
}
