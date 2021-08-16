import React from "react"
import Constants from 'expo-constants';
import AppNavigation from "./src/routes/routes"
import { NativeBaseProvider } from "native-base"
import { ApolloProvider, ApolloClient } from "@apollo/client"

import {localSchema, clientCache} from "./src/apollo/clientConfiguration"
import { NavigationContainer } from "@react-navigation/native"


function environmentConfig(node_env: string) {
    switch(node_env) {
        case "development":
            return Constants.manifest?.extra?.DEVELOPMENT
        case "production":
            return Constants.manifest?.extra?.PRODUCTION
        default:
            null
    }
}

export function App() {

    const {NODE_ENV} = process.env
    if (!NODE_ENV) return null

    const config = environmentConfig(NODE_ENV)

    const client = new ApolloClient({
        uri: config.server_uri,
        cache: clientCache,
        typeDefs: localSchema
    })

    return (
        <ApolloProvider client={client}>
            <NativeBaseProvider>
                <NavigationContainer>
                    <AppNavigation />
                </NavigationContainer>
            </NativeBaseProvider>
        </ApolloProvider>
    )
}

export default App