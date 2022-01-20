import { Text } from 'native-base'

import { RootStackRoutes, RootStack } from '@/navigation'

import SignInEmailSentScreen from '../screens/SignInEmailSentScreen'
import SignInLinkRedirectScreen from '../screens/SignInLinkRedirectScreen'
import SignInScreen from '../screens/SignInScreen'

import RegisterUserForm from './RegisterUserForm'
import { useActor, useInterpret } from '@xstate/react'
import {
    AppAuthContext,
    authMachine,
    AuthService,
    AuthState
} from '@/machines/authMachine'
import { useIsRegisteredQuery } from '@/generated'

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

export default function AppNavigator({
    authService
}: {
    authService: AuthService
}) {
    const [state] = useActor(authService)
    if (state.matches('loading') || state.matches('authenticated.loading'))
        return <Text>Loading...</Text>
    const initialRoute = getInitialRoute(state)
    const protectedScreens = renderProtectedScreens(state)

    return (
        <AppAuthContext.Provider value={authService}>
            <RootStack.Navigator initialRouteName={initialRoute}>
                {protectedScreens}
            </RootStack.Navigator>
        </AppAuthContext.Provider>
    )
}
