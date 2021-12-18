import React from 'react'

import { ApolloProvider } from '@apollo/client'
import { NavigationContainer } from '@react-navigation/native'
import { NativeBaseProvider, Text } from 'native-base'

import createAppClient from './apollo/createAppClient'

export function App() {
    return (
        <ApolloProvider client={createAppClient()}>
            <NativeBaseProvider>
                <NavigationContainer>
                    <Text>UmpCast</Text>
                </NavigationContainer>
            </NativeBaseProvider>
        </ApolloProvider>
    )
}

export default App
