import React from "react"
import { NativeBaseProvider } from "native-base"
import { ApolloProvider, ApolloClient } from "@apollo/client"

import ClientCache, { localSchema } from "app/cache"

import appConfig from "utils/env"
import { NavigationContainer } from "@react-navigation/native"

export function App() {
    const { NODE_ENV } = process.env
    if (!NODE_ENV) return null

    const client = new ApolloClient({
        uri: appConfig.server_uri,
        cache: new ClientCache(),
        typeDefs: localSchema
    })

    return (
        <ApolloProvider client={client}>
            <NativeBaseProvider>
                <NavigationContainer>{null}</NavigationContainer>
            </NativeBaseProvider>
        </ApolloProvider>
    )
}

export default App
