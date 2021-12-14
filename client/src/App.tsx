import React from 'react'

import { ApolloClient, ApolloProvider } from '@apollo/client'
import { NavigationContainer } from '@react-navigation/native'
import { registerRootComponent } from 'expo'
import { NativeBaseProvider, Text } from 'native-base'

import AppCache from '@/apollo/appCache'

export function App() {
    const client = new ApolloClient({
        cache: AppCache
    })

    return (
        <ApolloProvider client={client}>
            <NativeBaseProvider>
                <NavigationContainer>
                    <Text>UmpCast</Text>
                </NavigationContainer>
            </NativeBaseProvider>
        </ApolloProvider>
    )
}

export default registerRootComponent(App)
