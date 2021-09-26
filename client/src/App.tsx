import React from 'react'

import { ApolloClient, ApolloProvider, from, HttpLink } from '@apollo/client'
import { NavigationContainer } from '@react-navigation/native'
import { registerRootComponent } from 'expo'
import fetch from 'isomorphic-fetch'
import { NativeBaseProvider, Text } from 'native-base'

import AppCache from 'apollo/appCache'
import authLink from 'app/auth/link'
import retryLink from 'app/links/retryLink'
import AppConfig from 'global/appConfig'


export function App() {
    const httpLink = new HttpLink({
        uri: AppConfig.serverUri,
        fetch
    })

    const client = new ApolloClient({
        cache: AppCache,
        link: from([authLink, retryLink, httpLink])
    })

    return (
        <NativeBaseProvider>
            <ApolloProvider client={client}>
                <NavigationContainer>
                    <Text>Placeholder</Text>
                </NavigationContainer>
            </ApolloProvider>
        </NativeBaseProvider>
    )
}

export default registerRootComponent(App)
