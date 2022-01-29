import { useActor } from '@xstate/react'
import { Text } from 'native-base'

import AuthEmailReceiveEntry from '@/core/Auth/Email/ReceiveLink'
import AuthEmailSentScreen from '@/core/Auth/Email/SentConfirmation'
import AuthSignInScreen from '@/core/Auth/SignIn/Screen'
import DivisionCreateScreen from '@/core/Division/Create/Screen'
import PositionCreateScreen from '@/core/Position/Create/Screen'
import SeasonStructureRightHeader from '@/core/Season/Structure/RightHeader'
import SeasonStructureScreen from '@/core/Season/Structure/Screen'
import UserRegistrationScreen from '@/core/User/Registration/Screen'
import useAuthService from '@/hooks/service/useAuth'
import { AuthState } from '@/machines/auth'
import { RootStackRoutes, RootStack } from '@/navigation'

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
                <RootStack.Group screenOptions={{ headerShown: false }}>
                    <RootStack.Screen
                        component={HomeScreen}
                        name={RootStackRoutes.Home}
                    />
                </RootStack.Group>
                <RootStack.Screen
                    component={PositionCreateScreen}
                    name={RootStackRoutes.PositionCreate}
                    options={{
                        title: 'Create Position'
                    }}
                />
                <RootStack.Screen
                    component={DivisionCreateScreen}
                    name={RootStackRoutes.DivisionCreate}
                    options={{
                        title: 'Create Division'
                    }}
                />
                <RootStack.Screen
                    component={SeasonStructureScreen}
                    name={RootStackRoutes.SeasonStructure}
                    options={(props) => ({
                        title: 'Season Structure',
                        headerRight: () => (
                            <SeasonStructureRightHeader {...props} />
                        )
                    })}
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