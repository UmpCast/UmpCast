import { ApolloClient, ApolloProvider } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { NavigationContainer } from '@react-navigation/native'
import { getAuth } from 'firebase/auth'
import { NativeBaseProvider, Text } from 'native-base'
import { useMemo } from 'react'

import appCache from '@/apollo/appCache'
import { AuthState } from '@/apollo/generated'
import * as SignIn from '@/components/signIn'
import RootStack, { RootStackRoutes } from '@/navigation/rootStack'
import { loadAppExtra } from '@/utils/expoUtils'

import InitializedApp from './InitializedApp'

import { createClient, Provider as UrqlProvider } from 'urql'

function HomeScreen() {
    return <Text>Home</Text>
}

function RegisterScreen() {
    return <Text>Register</Text>
}

export const authLink = setContext(async () => ({
    headers: { authorization: await getAuth().currentUser?.getIdToken() }
}))

export const appNavConfig = {
    screens: {
        [RootStackRoutes.SignIn]: 'signin',
        [RootStackRoutes.SignInEmailSent]: 'email-sent',
        [RootStackRoutes.SignInEmailRecievedAlt]: '__/auth/action',
        [RootStackRoutes.SignInEmailRecieved]: 'email-signin'
    }
}

export const appNavLinking = {
    prefixes: [
        loadAppExtra().APP_URL,
        loadAppExtra().FIREBASE_AUTH_URL,
        `${loadAppExtra().APP_SCHEME}://`
    ],
    config: appNavConfig
}

export const renderProtectedScreens = (authState: AuthState) => {
    switch (authState) {
        case AuthState.Authenticated:
            return (
                <RootStack.Screen
                    component={HomeScreen}
                    name={RootStackRoutes.Home}
                />
            )
        case AuthState.Unregistered:
            return (
                <RootStack.Screen
                    component={RegisterScreen}
                    name={RootStackRoutes.Register}
                />
            )
        case AuthState.Unauthenticated:
        default:
            return (
                <RootStack.Group
                    screenOptions={{
                        headerShown: true
                    }}
                    key="SignIn"
                >
                    <RootStack.Screen
                        component={SignIn.MainScreen}
                        name={RootStackRoutes.SignIn}
                    />
                    <RootStack.Screen
                        component={SignIn.EmailSentScreen}
                        name={RootStackRoutes.SignInEmailSent}
                    />
                    <RootStack.Screen
                        component={SignIn.EmailRecievedScreen}
                        name={RootStackRoutes.SignInEmailRecieved}
                    />
                    <RootStack.Screen
                        component={SignIn.EmailRecievedScreen}
                        name={RootStackRoutes.SignInEmailRecievedAlt}
                    />
                </RootStack.Group>
            )
    }
}

export default function Main() {
    const client = useMemo(
        () =>
            createClient({
                url: `${loadAppExtra().SERVER_GRAPHQL_URL}/graphql`
            }),
        [createClient, loadAppExtra]
    )

    return (
        <UrqlProvider value={client}>
            <NativeBaseProvider>
                <NavigationContainer linking={appNavLinking}>
                    <InitializedApp
                        renderProtectedScreens={renderProtectedScreens}
                    />
                </NavigationContainer>
            </NativeBaseProvider>
        </UrqlProvider>
    )
}
