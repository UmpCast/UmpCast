import { Text } from 'native-base'

import { RootStackRoutes, RootStack } from '@/navigation'

import SignInEmailSentScreen from '../SignInEmailSentScreen'
import SignInLinkRedirectScreen from '../SignInLinkRedirectScreen'
import SignInScreen from '../SignInScreen'

import { useActor } from '@xstate/react'
import { AuthState } from '@/machines/authMachine'
import useAuthService from '@/hooks/useAuthService'
import RegisterUserScreen from '../RegisterUserScreen'

function HomeScreen() {
    return <Text>Home</Text>
}

export const getInitialRoute = (state: AuthState) => {
    if (state.matches('authenticated.authorized')) {
        return RootStackRoutes.Home
    } else if (state.matches('authenticated.unauthorized')) {
        return RootStackRoutes.Register
    } else {
        return RootStackRoutes.SignIn
    }
}

export const renderProtectedScreens = (state: AuthState) => {
    if (state.matches('authenticated.authorized'))
        return (
            <RootStack.Screen
                component={HomeScreen}
                name={RootStackRoutes.Home}
                options={{ headerShown: false }}
            />
        )
    else if (state.matches('authenticated.unauthorized'))
        return (
            <RootStack.Screen
                component={RegisterUserScreen}
                name={RootStackRoutes.Register}
                options={{ headerShown: false }}
            />
        )
    else
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

export default function AppNavigator() {
    const authService = useAuthService()
    const [state] = useActor(authService)

    if (state.matches('loading') || state.matches('authenticated.loading'))
        return <Text>Loading...</Text>
    const initialRoute = getInitialRoute(state)
    const protectedScreens = renderProtectedScreens(state)

    return (
        <RootStack.Navigator initialRouteName={initialRoute}>
            {protectedScreens}
        </RootStack.Navigator>
    )
}
