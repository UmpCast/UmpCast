import { WrapperProps } from '@/app/common/components/types'
import { AuthState } from '@/app/generated-types'
import { PublicRoutes } from '@/app/public/utils/publicNavigation'
import { SignInRoutes } from '@/app/signin/utils/signInNavigation'
import AppStack from './AppStack'

export interface AppNavigatorProps extends WrapperProps {
    authState: AuthState
}

export const getInitialRoute = (authState: AuthState) => {
    switch (authState) {
        case AuthState.Authenticated:
            return PublicRoutes.PrivacyPolicy
        case AuthState.Unregistered:
            return PublicRoutes.PrivacyPolicy
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
