import React from 'react'

import { ApolloClient, ApolloProvider, from } from '@apollo/client'
import { RetryLink } from '@apollo/client/link/retry'
import { NavigationContainer } from '@react-navigation/native'
import { registerRootComponent } from 'expo'
import { NativeBaseProvider, Text } from 'native-base'

import AppCache from 'apollo/appCache'
import AuthProvider from 'app/auth/containers/AuthProvider'
import authHttpLink from 'app/auth/link/authHttpLink'

export function App() {
    const retryLink = new RetryLink()

    const client = new ApolloClient({
        cache: AppCache,
        link: from([retryLink, authHttpLink])
    })

    return (
        <ApolloProvider client={client}>
            <NativeBaseProvider>
                <NavigationContainer>
                    <AuthProvider
                        webSplash={<Text>UmpCast</Text>}
                        loggedIn={<Text>Home</Text>}
                        loggedOut={<Text>Log In</Text>}
                    />
                </NavigationContainer>
            </NativeBaseProvider>
        </ApolloProvider>
    )
}

export default registerRootComponent(App)
