import { ApolloClient, ApolloProvider } from '@apollo/client'
import { NativeBaseProvider } from 'native-base'
import AppCache from '../../../apollo/appCache'

import { getAuth } from 'firebase/auth'

import { setContext } from '@apollo/client/link/context'

import RootStack, { RootStackRoutes } from '@/navigation/rootStack'
import { NavigationContainer } from '@react-navigation/native'
import { loadAppExtra } from '@/utils/extra'
import { AuthState } from '@/apollo/generated'
import useInitializedAuthState from '@/hooks/useInitializedAuthState'
import AppLoadingView from '../views/LoadingView'
import { Text } from 'native-base'
import * as SignIn from '@/components/signIn'
import { useMemo } from 'react'

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

export default function Main() {
    const client = useMemo(
        () =>
            new ApolloClient({
                cache: AppCache,
                uri: `${loadAppExtra().SERVER_GRAPHQL_URL}/graphql`
            }),
        [AppCache, ApolloClient, loadAppExtra]
    )

    const authState = useInitializedAuthState()

    if (!authState) return <AppLoadingView />

    const initialRoute = getInitialRoute(authState)
    return (
        <ApolloProvider client={client}>
            <NativeBaseProvider>
                <NavigationContainer linking={appNavLinking}>
                    <RootStack.Navigator initialRouteName={initialRoute}>
                        {authState === AuthState.Authenticated ? (
                            <Text>Authenticated</Text>
                        ) : authState === AuthState.Unregistered ? (
                            <Text>Unregistered</Text>
                        ) : (
                            <>
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
                                        name={
                                            RootStackRoutes.SignInEmailRecieved
                                        }
                                    />
                                    <RootStack.Screen
                                        component={SignIn.EmailRecievedScreen}
                                        name={
                                            RootStackRoutes.SignInEmailRecievedAlt
                                        }
                                    />
                                </RootStack.Group>
                            </>
                        )}
                    </RootStack.Navigator>
                </NavigationContainer>
            </NativeBaseProvider>
        </ApolloProvider>
    )
}
