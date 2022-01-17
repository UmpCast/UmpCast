import { Text } from 'native-base'

import useAuthPhase from '@/hooks/useAuthPhase'
import { AuthPhase } from '@/models/authentication'
import RootStack, { RootStackRoutes } from '@/rootStack'

import RegisterUserForm from './RegisterUserForm'
import SignInEmailSentScreen from './SignInEmailSentScreen'
import SignInLinkRedirectScreen from './SignInLinkRedirectScreen'
import SignInScreen from './SignInScreen'

function HomeScreen() {
    return <Text>Home</Text>
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
                    options={{ headerShown: false }}
                />
            )
        case AuthPhase.UNREGISTERED:
            return (
                <RootStack.Screen
                    component={RegisterUserForm}
                    name={RootStackRoutes.Register}
                    options={{ headerShown: false }}
                />
            )
        case AuthPhase.UNAUTHENTICATED:
        default:
            return (
                <RootStack.Group
                    key="SignIn"
                    screenOptions={{
                        headerShown: false
                    }}
                >
                    <RootStack.Screen
                        component={SignInScreen}
                        name={RootStackRoutes.SignIn}
                    />
                    <RootStack.Screen
                        component={SignInEmailSentScreen}
                        name={RootStackRoutes.SignInEmailSent}
                    />
                    <RootStack.Screen
                        component={SignInLinkRedirectScreen}
                        name={RootStackRoutes.SignInLinkRedirect}
                    />
                    <RootStack.Screen
                        component={SignInLinkRedirectScreen}
                        name={RootStackRoutes.SignInLinkRedirectAlt}
                    />
                </RootStack.Group>
            )
    }
}

export default function AppNavigator() {
    const phase = useAuthPhase()

    if (!phase) return <Text>Loading...</Text>

    const initialRoute = getInitialRoute(phase)
    const protectedScreens = renderProtectedScreens(phase)

    return (
        <RootStack.Navigator initialRouteName={initialRoute}>
            {protectedScreens}
        </RootStack.Navigator>
    )
}
