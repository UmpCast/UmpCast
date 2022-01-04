import { AuthState } from '@/apollo/generated'
import useInitializedAuthState from '@/hooks/useInitializedAuthState'
import RootStack, { RootStackRoutes } from '@/navigation/rootStack'
import AppLoadingView from '../views/LoadingView'
import { Text } from 'native-base'
import * as SignIn from '@/components/signIn'

const AuthenticatedScreen = () => <Text>Authenticated</Text>

const UnregisteredScreen = () => <Text>Unregistered</Text>

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
            return (
                <RootStack.Screen
                    component={AuthenticatedScreen}
                    name={RootStackRoutes.SignIn}
                />
            )
        case AuthState.Unregistered:
            return (
                <RootStack.Screen
                    component={UnregisteredScreen}
                    name={RootStackRoutes.SignIn}
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

    const protectedScreens = getProtectedScreens(authState)

    const initialRoute = getInitialRoute(authState)

    return (
        <RootStack.Navigator initialRouteName={initialRoute}>
            {protectedScreens}
        </RootStack.Navigator>
    )
}
