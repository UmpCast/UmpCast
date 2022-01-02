import { NavigationContainer } from '@react-navigation/native'
import { loadAppExtra } from '@/app/common/utils/appExtra'
import { SignInRoutes } from '@/app/signin/utils/signInNavigation'

export const appNavConfig = {
    screens: {
        [SignInRoutes.SignIn]: 'signin',
        [SignInRoutes.EmailSignInSent]: 'email-sent',
        [SignInRoutes.EmailSignInRecievedAlt]: '__/auth/action',
        [SignInRoutes.EmailSignInRecieved]: 'email-signin'
    }
}

export const appNavLinking = {
    prefixes: [
        loadAppExtra().APP_URL,
        loadAppExtra().FIREBASE_AUTH_URL,
        `${loadAppExtra().APP_SCHEME}://`
    ],
    config: appNavConfig
}

export interface AppNavigationContainerProps {
    children: JSX.Element
}

export default function AppNavigationProvider({
    children
}: AppNavigationContainerProps) {
    return (
        <NavigationContainer linking={appNavLinking}>
            {children}
        </NavigationContainer>
    )
}
