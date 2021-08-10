import React from 'react'
import AppNavigation from "./src/routes/index"
import { NativeBaseProvider } from "native-base"
import { ApolloProvider, ApolloClient } from "@apollo/client"

import {cache, link} from "./src/apollo/index"

function getEnvironmentOptions(node_env: string){
    switch(node_env){
        case "production":
        case "development":
        case "test":
        default:
            return {}
    }
}

function createClient() {
    const {
        NODE_ENV,
        GRAPHQL_URI
    } = process.env

    const baseOptions = {
        cache: cache,
        uri: GRAPHQL_URI,
        link: link
    }

    const envOptions = getEnvironmentOptions(NODE_ENV as string)

    return new ApolloClient({
        ...baseOptions,
        ...envOptions
    })
}

export default function App() {
    return (
        <ApolloProvider client={createClient()}>
            <NativeBaseProvider>
                <AppNavigation />
            </NativeBaseProvider>
        </ApolloProvider>
    )
}
