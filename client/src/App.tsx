import React from 'react'

import { ApolloClient, ApolloProvider, from, HttpLink } from '@apollo/client'
import { NavigationContainer } from '@react-navigation/native'
import { registerRootComponent } from 'expo'
import { NativeBaseProvider, Text } from 'native-base'

import ClientCache, { localSchema } from 'apollo/cache'
import AppProvider from 'app/provider'
import appConfig from 'utils/env'

const httpLink = new HttpLink({
    uri: appConfig.serverUri
})

const clientLink = from([httpLink])

const client = new ApolloClient({
    link: clientLink,
    cache: new ClientCache(),
    typeDefs: localSchema
})

export function App() {
    return (
        <NativeBaseProvider>
            <ApolloProvider client={client}>
                <AppProvider>
                    <NavigationContainer>
                        <Text>Placeholder</Text>
                    </NavigationContainer>
                </AppProvider>
            </ApolloProvider>
        </NativeBaseProvider>
    )
}

export default registerRootComponent(App)
