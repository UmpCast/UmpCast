import { useActor } from '@xstate/react'
import { Text } from 'native-base'

import SignInEmailSentScreen from '@/core/Auth/Email/SentConfirmation'
import UserRegistrationScreen from '@/core/User/Registration/Screen'
import useAuthService from '@/hooks/service/useAuth'
import { AuthState } from '@/machines/auth'
import { RootStackRoutes, RootStack } from '@/navigation'
import AuthSignInScreen from '@/core/Auth/SignIn/Screen'
import AuthEmailSentScreen from '@/core/Auth/Email/SentConfirmation'
import AuthEmailReceiveEntry from '@/core/Auth/Email/ReceiveLink'
import DivisionEditList from '@/core/Division/Edit/List'
import SeasonStructureRightHeader from '@/core/Season/Structure/RightHeader'
import PositionCreateScreen from '@/core/Position/Create/Screen'
import DivisionCreateScreen from '@/core/Division/Create/Screen'

function HomeScreen() {
    return <Text>Home</Text>
}

export const getInitialRoute = (state: AuthState) => {
    if (state.matches('authenticated.authorized')) {
        return RootStackRoutes.Home
    }
    if (state.matches('authenticated.unauthorized')) {
        return RootStackRoutes.Register
    }
    return RootStackRoutes.AuthSignIn
}

export const renderProtectedScreens = (state: AuthState) => {
    if (state.matches('authenticated.authorized'))
        return (
            <>
                <RootStack.Screen
                    component={HomeScreen}
                    name={RootStackRoutes.Home}
                    options={{ headerShown: false }}
                />
                <RootStack.Screen
                    name={RootStackRoutes.PositionCreate}
                    component={PositionCreateScreen}
                />
                <RootStack.Screen
                    name={RootStackRoutes.DivisionCreate}
                    component={DivisionCreateScreen}
                />
                <RootStack.Screen
                    name={RootStackRoutes.SeasonStructure}
                    options={(props) => ({
                        headerRight: () => (
                            <SeasonStructureRightHeader {...props} />
                        )
                    })}
                    component={DivisionEditList}
                />
            </>
        )
    if (state.matches('authenticated.unauthorized'))
        return (
            <RootStack.Screen
                component={UserRegistrationScreen}
                name={RootStackRoutes.Register}
                options={{ headerShown: false }}
            />
        )
    return (
        <RootStack.Group
            key="SignIn"
            screenOptions={{
                headerShown: false
            }}
        >
            <RootStack.Screen
                component={AuthSignInScreen}
                name={RootStackRoutes.AuthSignIn}
            />
            <RootStack.Screen
                component={AuthEmailSentScreen}
                name={RootStackRoutes.AuthEmailSent}
            />
            <RootStack.Screen
                component={AuthEmailReceiveEntry}
                name={RootStackRoutes.AuthEmailReceiveLink}
            />
            <RootStack.Screen
                component={AuthEmailReceiveEntry}
                name={RootStackRoutes.AuthEmailReceiveLinkAlt}
            />
        </RootStack.Group>
    )
}

export default function AppInitializedNavigator() {
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
