import { Text } from 'native-base'

import * as SignIn from '@/components/signIn'
import useAuthPhase from '@/hooks/useAuthPhase'
import { AuthPhase } from '@/models/authentication'
import RootStack, { RootStackRoutes } from '@/navigation/rootStack'

import AppLoadingView from '../views/LoadingView'

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
    const phase = useAuthPhase()

    if (!phase) return <AppLoadingView />

    const initialRoute = getInitialRoute(phase)
    const protectedScreens = renderProtectedScreens(phase)

    return (
        <RootStack.Navigator initialRouteName={initialRoute}>
            {protectedScreens}
        </RootStack.Navigator>
    )
}
