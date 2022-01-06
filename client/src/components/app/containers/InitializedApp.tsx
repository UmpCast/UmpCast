import RootStack, { RootStackRoutes } from '@/navigation/rootStack'

import * as SignIn from '@/components/signIn'
import { Text } from 'native-base'

import AppLoadingView from '../views/LoadingView'
import useAuthPhase from '@/hooks/useAuthPhase'

function HomeScreen() {
    return <Text>Home</Text>
}

function RegisterScreen() {
    return <Text>Register</Text>
}

export const getInitialRoute = (phase: AuthPhase) => {
    switch (phase) {
        case AuthPhase.AUTHENTICATED:
            return RootStackRoutes.Home
        case AuthPhase.UNREGISTERED:
            return RootStackRoutes.Register
        case AuthPhase.UNAUTHENTICATED:
        default:
            return RootStackRoutes.SignIn
    }
}

export const renderProtectedScreens = (phase: AuthPhase) => {
    switch (phase) {
        case AuthPhase.AUTHENTICATED:
            return (
                <RootStack.Screen
                    component={HomeScreen}
                    name={RootStackRoutes.Home}
                />
            )
        case AuthPhase.UNREGISTERED:
            return (
                <RootStack.Screen
                    component={RegisterScreen}
                    name={RootStackRoutes.Register}
                />
            )
        case AuthPhase.UNAUTHENTICATED:
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
    const AuthPhase = useAuthPhase()

    if (!AuthPhase) return <AppLoadingView />

    const initialRoute = getInitialRoute(AuthPhase)
    const protectedScreens = renderProtectedScreens(AuthPhase)

    return (
        <RootStack.Navigator initialRouteName={initialRoute}>
            {protectedScreens}
        </RootStack.Navigator>
    )
}
