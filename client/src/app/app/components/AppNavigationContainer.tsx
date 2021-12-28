import { NavigationContainer } from '@react-navigation/native'
import { loadAppExtra } from '@/app/common/utils/appExtra'
import { UnauthRoutes } from '@/app/authentication/containers/UnauthStack'

export const appNavConfig = {
    screens: {
        [UnauthRoutes.SignIn]: 'signin',
        [UnauthRoutes.EmailSignInSent]: 'email-sent',
        [UnauthRoutes.EmailSignInRedirect]: 'email-redirect'
    }
}

export const appNavLinking = {
    prefixes: [loadAppExtra().APP_URL, `${loadAppExtra().APP_SCHEME}://`],
    config: appNavConfig
}

export interface AppNavigationContainerProps {
    children: JSX.Element
}

export default function AppNavigationContainer({
    children
}: AppNavigationContainerProps) {
    return (
        <NavigationContainer linking={appNavLinking}>
            {children}
        </NavigationContainer>
    )
}
