import { AuthState } from '@/apollo/generated'
import useInitializedAuthState from '@/hooks/useInitializedAuthState'
import RootStack, { RootStackRoutes } from '@/navigation/rootStack'

import AppLoadingView from '../views/LoadingView'

export const getInitialRoute = (authState: AuthState) => {
    switch (authState) {
        case AuthState.Authenticated:
            return RootStackRoutes.Home
        case AuthState.Unregistered:
            return RootStackRoutes.Register
        case AuthState.Unauthenticated:
        default:
            return RootStackRoutes.SignIn
    }
}

export interface InitializedAppProps {
    renderProtectedScreens: (authState: AuthState) => JSX.Element
}

export default function InitializedApp({
    renderProtectedScreens
}: InitializedAppProps) {
    const authState = useInitializedAuthState()

    if (!authState) return <AppLoadingView />

    const protectedScreens = renderProtectedScreens(authState)

    const initialRoute = getInitialRoute(authState)

    return (
        <RootStack.Navigator initialRouteName={initialRoute}>
            {protectedScreens}
        </RootStack.Navigator>
    )
}
