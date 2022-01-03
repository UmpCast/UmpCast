import { ApolloClient, ApolloProvider } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { NavigationContainer } from '@react-navigation/native'
import { getAuth } from 'firebase/auth'
import { NativeBaseProvider, Text } from 'native-base'
import { useMemo } from 'react'

import appCache from '@/apollo/appCache'
import { AuthState } from '@/apollo/generated'
import * as SignIn from '@/components/signIn'
import useInitializedAuthState from '@/hooks/useInitializedAuthState'
import RootStack, { RootStackRoutes } from '@/navigation/rootStack'
import { loadAppExtra } from '@/utils/extra'

import AppLoadingView from '../views/LoadingView'

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

export const getInitialRoute = (authState: AuthState) => {
    switch (authState) {
        case AuthState.Authenticated:
            return RootStackRoutes.SignIn
        case AuthState.Unregistered:
            return RootStackRoutes.SignIn
        case AuthState.Unauthenticated:
        default:
            return RootStackRoutes.SignIn
    }
}

export const getProtectedScreens = (authState: AuthState) => {
    switch (authState) {
        case AuthState.Authenticated:
            return <Text>Authenticated</Text>
        case AuthState.Unregistered:
            return <Text>Unregistered</Text>
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
            new ApolloClient({
                cache: appCache,
                uri: `${loadAppExtra().SERVER_GRAPHQL_URL}/graphql`
            }),
        [appCache, ApolloClient, loadAppExtra]
    )

    const authState = useInitializedAuthState()

    if (!authState) return <AppLoadingView />

    const protectedScreens = getProtectedScreens(authState)

    const initialRoute = getInitialRoute(authState)
    return (
        <ApolloProvider client={client}>
            <NativeBaseProvider>
                <NavigationContainer linking={appNavLinking}>
                    <RootStack.Navigator initialRouteName={initialRoute}>
                        {protectedScreens}
                    </RootStack.Navigator>
                </NavigationContainer>
            </NativeBaseProvider>
        </ApolloProvider>
    )
}
