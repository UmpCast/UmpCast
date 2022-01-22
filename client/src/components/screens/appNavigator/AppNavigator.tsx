import { Text } from 'native-base'

import { RootStackRoutes, RootStack } from '@/navigation'

import SignInEmailSentScreen from '../SignInEmailSentScreen'
import SignInLinkRedirectScreen from '../SignInLinkRedirectScreen'
import SignInScreen from '../SignInScreen'

import RegisterUserForm from '../../core/RegisterUserForm'
import { useActor } from '@xstate/react'
import { AuthService, AuthState } from '@/machines/authMachine'
import useAuthService from '@/hooks/useAuthService'
import { useClient } from 'urql'
import urqlMockingClient from '@/utils/dev/urql'

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
                component={RegisterUserForm}
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

export default function AppNavigator({resetClient}) {
    const client = useClient()
    const authService = useAuthService({client, resetClient})
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
