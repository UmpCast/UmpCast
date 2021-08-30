import React from 'react'

import { ApolloProvider, ApolloClient } from '@apollo/client'
import { NavigationContainer } from '@react-navigation/native'
import { registerRootComponent } from 'expo'
import { NativeBaseProvider, Text } from 'native-base'

import ClientCache, { localSchema } from 'app/cache'
import NetworkProvider from 'app/overlay/containers/networkProvider'
import appConfig from 'utils/env'

export function App() {
    const { NODE_ENV } = process.env
    if (!NODE_ENV) return null

    const client = new ApolloClient({
        uri: appConfig.serverUri,
        cache: new ClientCache(),
        typeDefs: localSchema
    })

    return (
        <ApolloProvider client={client}>
            <NativeBaseProvider>
                <NetworkProvider>
                    <NavigationContainer>
                        <Text>Placeholder</Text>
                    </NavigationContainer>
                </NetworkProvider>
            </NativeBaseProvider>
        </ApolloProvider>
    )
}

export default registerRootComponent(App)
