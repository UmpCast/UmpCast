import { AuthState } from '@/nx/hooks/useAuthState'

import NavHeaderTitle from '../../HeaderTitle'

import { RootStackRoute, RootStack } from './Stack'
import getStackScreens from './getStackScreens'

export const getInitialNavRoute = (authState: AuthState) => {
    switch (authState) {
        case AuthState.UNAUTHENTICATED:
            return RootStackRoute.Login
        case AuthState.UNAUTHORIZED:
            return RootStackRoute.Register
        case AuthState.AUTHORIZED:
            return RootStackRoute.App
        default:
            throw new Error(`received invalid authState ${authState}`)
    }
}

export default function RootStackNavigator() {
    const authState = AuthState.AUTHORIZED

    const initialRoute = getInitialNavRoute(authState)
    const screens = getStackScreens(authState)

    return (
        <RootStack.Navigator
            initialRouteName={initialRoute}
            screenOptions={{
                headerTitle: ({ children }) => <NavHeaderTitle>{children}</NavHeaderTitle>
            }}
        >
            {screens}
        </RootStack.Navigator>
    )
}
