import React from 'react'

import { ApolloClient, ApolloProvider, from } from '@apollo/client'
import { RetryLink } from '@apollo/client/link/retry'
import { NavigationContainer } from '@react-navigation/native'
import { registerRootComponent } from 'expo'
import { NativeBaseProvider, Text } from 'native-base'

import AppCache from 'apollo/appCache'
import AuthProvider from 'app/auth/containers/AuthProvider'
import authHttpLink from 'app/auth/link/authHttpLink'
import MockAppProvider from 'utils/__mocks__/mockAppProvider'

export function App() {
    const retryLink = new RetryLink()

    const client = new ApolloClient({
        cache: AppCache,
        link: from([retryLink, authHttpLink])
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

export function Test() {
    const mockAuthApp = (
        <AuthProvider
            webSplash={<Text>UmpCast</Text>}
            loggedIn={<Text>Home</Text>}
            loggedOut={<Text>Log In</Text>}
        />
    )

    return <MockAppProvider>{mockAuthApp}</MockAppProvider>
}

export default registerRootComponent(Test)
