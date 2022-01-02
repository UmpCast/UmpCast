import { WrapperProps } from '@/app/common/components/types'
import { AuthState } from '@/app/generated-types'
import { SignInRoutes } from '@/app/signin/utils/signInNavigation'
import { useRoute } from '@react-navigation/native'
import { TempRoutes } from '../utils/tempNavigation'
import AppStack from './AppStack'

export interface AppNavigatorProps extends WrapperProps {
    authState: AuthState
}

export const getInitialRoute = (authState: AuthState) => {
    switch (authState) {
        case AuthState.Authenticated:
            return TempRoutes.Authenticated
        case AuthState.Unregistered:
            return TempRoutes.Unregistered
        case AuthState.Unauthenticated:
        default:
            return SignInRoutes.SignIn
    }
}

export default function AppNavigator({
    authState,
    children
}: AppNavigatorProps) {
    const initialRoute = getInitialRoute(authState)

    return (
        <AppStack.Navigator initialRouteName={initialRoute}>
            {children}
        </AppStack.Navigator>
    )
}
