import { NativeBaseProvider } from 'native-base'
import React from 'react'
import AppNavigationContainer from '@/app/app/components/AppNavigationContainer'
import ApolloMockingProvider, {
    ApolloMockingProviderProps
} from './ApolloMockingProvider'

export interface AppMockingProviderProps extends ApolloMockingProviderProps {}

export interface MockNativeBaseProviderProps {
    children: JSX.Element
}

export function MockNativeBaseProvider({
    children
}: MockNativeBaseProviderProps) {
    return (
        <NativeBaseProvider
            initialWindowMetrics={{
                frame: { x: 0, y: 0, width: 0, height: 0 },
                insets: { top: 0, left: 0, right: 0, bottom: 0 }
            }}
        >
            {children}
        </NativeBaseProvider>
    )
}

export default function AppMockingProvider({
    children,
    mocks,
    logging
}: AppMockingProviderProps) {
    return (
        <ApolloMockingProvider mocks={mocks} logging={logging}>
            <MockNativeBaseProvider>
                <AppNavigationContainer>{children}</AppNavigationContainer>
            </MockNativeBaseProvider>
        </ApolloMockingProvider>
    )
}
