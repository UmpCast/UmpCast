import { Text } from 'native-base'

import useAuthState, { AuthState } from '@/nx/hooks/useAuthState'

import NavHeaderTitle from '../../HeaderTitle'

import { RootStackRoute, RootStack } from './Stack'
import getAuthorizedScreens from './getAuthorizedScreens'

export const getInitialNavRoute = (authState: AuthState) => {
    switch (authState) {
        case AuthState.UNAUTHENTICATED:
            return RootStackRoute.Login
        case AuthState.UNAUTHORIZED:
            return RootStackRoute.Register
        case AuthState.AUTHORIZED:
            return RootStackRoute.Home
        default:
            throw new Error(`received invalid authState ${authState}`)
    }
}

export default function RootStackNavigator() {
    const authState = useAuthState()

    if (authState === AuthState.LOADING) {
        return <Text>Loading...</Text>
    }

    const initialRoute = getInitialNavRoute(authState)
    const screens = getAuthorizedScreens(authState)

    return (
        <RootStack.Navigator
            initialRouteName={initialRoute}
            screenOptions={{
                headerTitle: ({ children }) => (
                    <NavHeaderTitle>{children}</NavHeaderTitle>
                )
            }}
        >
            {screens}
        </RootStack.Navigator>
    )
}
