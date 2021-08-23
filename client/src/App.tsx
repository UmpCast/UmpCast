import React from 'react'

import { ApolloProvider, ApolloClient } from '@apollo/client'
import { NavigationContainer } from '@react-navigation/native'
import { NativeBaseProvider, Text } from 'native-base'

import ClientCache, { localSchema } from 'app/cache'
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
                <NavigationContainer>
                    <Text>Placeholder</Text>
                </NavigationContainer>
            </NativeBaseProvider>
        </ApolloProvider>
    )
}

export default App
