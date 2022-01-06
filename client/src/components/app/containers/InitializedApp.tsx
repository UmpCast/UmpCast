import useInitializedAuthState from '@/hooks/useInitializedAuthState'
import RootStack, { RootStackRoutes } from '@/navigation/rootStack'

import * as SignIn from '@/components/signIn'
import { Text } from 'native-base'

import AppLoadingView from '../views/LoadingView'
import { AuthState } from '@/urql/generated'

function HomeScreen() {
    return <Text>Home</Text>
}

function RegisterScreen() {
    return <Text>Register</Text>
}

export const getInitialRoute = (authState: AuthState) => {
    switch (authState) {
        case AuthState.Authenticated:
            return RootStackRoutes.Home
        case AuthState.Unregistered:
            return RootStackRoutes.Register
        case AuthState.Unauthenticated:
        default:
            return RootStackRoutes.SignIn
    }
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

export default function InitializedApp() {
    const authState = useInitializedAuthState()

    if (!authState) return <AppLoadingView />

    const protectedScreens = renderProtectedScreens(authState)

    const initialRoute = getInitialRoute(authState)

    return (
        <RootStack.Navigator initialRouteName={initialRoute}>
            {protectedScreens}
        </RootStack.Navigator>
    )
}
