import * as WebBrowser from 'expo-web-browser'
import AppMockingProvider from '@/mock/components/AppMockingProvider'
import {
    UnauthRoutes,
    UnauthStack
} from '../authentication/containers/UnauthStack'
import authScenarios from '@/mock/scenarios/authScenarios'
import * as SignIn from '../authentication'

WebBrowser.maybeCompleteAuthSession()

export default function App() {
    return (
        <AppMockingProvider
            mocks={authScenarios.EMAIL_SIGNIN_DEFAULT}
            withNavigation
        >
            <UnauthStack.Navigator>
                <UnauthStack.Screen
                    component={SignIn.Screens.Main}
                    name={UnauthRoutes.SignIn}
                />
                <UnauthStack.Screen
                    component={SignIn.Screens.EmailSent}
                    name={UnauthRoutes.EmailSignInSent}
                />
                <UnauthStack.Screen
                    component={SignIn.Screens.Email}
                    name={UnauthRoutes.EmailSignInAlt}
                />
                <UnauthStack.Screen
                    component={SignIn.Screens.Email}
                    name={UnauthRoutes.EmailSignInRecieved}
                />
            </UnauthStack.Navigator>
        </AppMockingProvider>
    )
}
