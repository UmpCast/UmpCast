import { NativeBaseProvider } from 'native-base'
import React from 'react'
import { AppNavigationContainer } from '@/app/app/components/AppProvider'
import ApolloMockingProvider, {
    ApolloMockingProviderProps
} from './ApolloMockingProvider'

export type AppMockingProviderProps = ApolloMockingProviderProps

export default function AppMockingProvider({
    children,
    mocks,
    logging
}: AppMockingProviderProps) {
    return (
        <ApolloMockingProvider mocks={mocks} logging={logging}>
            <NativeBaseProvider>
                <AppNavigationContainer>{children}</AppNavigationContainer>
            </NativeBaseProvider>
        </ApolloMockingProvider>
    )
}
