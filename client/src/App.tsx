import React from 'react'

import { ApolloProvider } from '@apollo/client'
import { NavigationContainer } from '@react-navigation/native'
import { registerRootComponent } from 'expo'
import { NativeBaseProvider, Text } from 'native-base'

import NetworkProvider from 'app/overlay/containers/networkProvider'
import AppProvider from 'app/provider'
import AppClient from 'global/client'

export function App() {
    return (
        <NativeBaseProvider>
            <ApolloProvider client={AppClient}>
                <NetworkProvider>
                    <AppProvider>
                        <NavigationContainer>
                            <Text>Placeholder</Text>
                        </NavigationContainer>
                    </AppProvider>
                </NetworkProvider>
            </ApolloProvider>
        </NativeBaseProvider>
    )
}

export default registerRootComponent(App)
