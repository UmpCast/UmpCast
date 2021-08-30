import React, { useEffect } from 'react'

import { ApolloProvider } from '@apollo/client'
import { NavigationContainer } from '@react-navigation/native'
import { registerRootComponent } from 'expo'
import { NativeBaseProvider, Text } from 'native-base'

import AppProvider from 'app/provider'
import useLoaderSubscriber from 'app/provider/hooks/useLoaderSubscriber'
import AppClient from 'global/client'

export function App() {
    return (
        <NativeBaseProvider>
            <ApolloProvider client={AppClient}>
                <NavigationContainer>
                    <Text>Placeholder</Text>
                </NavigationContainer>
            </ApolloProvider>
        </NativeBaseProvider>
    )
}

export function TestComponent() {
    const testLoader = useLoaderSubscriber({
        icon: 'static',
        title: 'UmpCast',
        message: null
    })

    useEffect(() => {
        testLoader(async (setMessage) => {
            setMessage('Creating Account...')
            await new Promise((resolve) => setTimeout(resolve, 1000))
            setMessage('Signing In...')
            await new Promise((resolve) => setTimeout(resolve, 1000))
            setMessage('Bafooning Around...')
            await new Promise((resolve) => setTimeout(resolve, 1000))
            return true
        })
    })

    return <Text>Placeholder</Text>
}

export function Test() {
    return (
        <NativeBaseProvider>
            <ApolloProvider client={AppClient}>
                <AppProvider>
                    <Text>placeholder</Text>
                </AppProvider>
            </ApolloProvider>
        </NativeBaseProvider>
    )
}

export default registerRootComponent(Test)
