import * as WebBrowser from 'expo-web-browser'
import AppMockingProvider from '@/mock/components/AppMockingProvider'

import authScenarios from '@/mock/scenarios/authScenarios'
import * as SignIn from '../signin'
import { UnauthStack, UnauthRoutes } from '../signin/containers/UnauthStack'

WebBrowser.maybeCompleteAuthSession()

export default function App() {
    return (
        <AppMockingProvider
            resolvers={authScenarios.EMAIL_SIGNIN_DEFAULT}
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
