import React, { useEffect } from 'react'

import { NavigationContainer } from '@react-navigation/native'
import { NativeBaseProvider, Text } from 'native-base'

import ApolloMockingProvider from './mock/ApolloMockingProvider'
import useSendEmailVerification from './app/authentication/graphql/mutations/sendEmailVerification'

function Test() {
    const [send] = useSendEmailVerification()
    useEffect(() => {
        send({
            variables: {
                input: {
                    email: 'a@gmil.omc'
                },
                route: 'verify'
            }
        }).then(console.log)
    }, [])
    return <Text> Testing</Text>
}

export function App() {
    return (
        <ApolloMockingProvider>
            <NativeBaseProvider>
                <NavigationContainer>
                    <Test />
                </NavigationContainer>
            </NativeBaseProvider>
        </ApolloMockingProvider>
    )
}

export default App
