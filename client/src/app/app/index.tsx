import * as WebBrowser from 'expo-web-browser'
import AppMockingProvider from '@/mock/components/AppMockingProvider'

import signInScenarios from '@/mock/scenarios/signInScenarios'
import * as SignIn from '../signin'
import AppStack from './components/AppStack'
import { SignInRoutes } from '../signin/utils/signInNavigation'

WebBrowser.maybeCompleteAuthSession()

export default function App() {
    return (
        <AppMockingProvider
            resolvers={signInScenarios.EMAIL_SIGNIN_DEFAULT}
            withNavigation
        >
            <AppStack.Navigator>
                <AppStack.Screen
                    component={SignIn.Screens.Main}
                    name={SignInRoutes.SignIn}
                />
                <AppStack.Screen
                    component={SignIn.Screens.EmailSent}
                    name={SignInRoutes.EmailSignInSent}
                />
                <AppStack.Screen
                    component={SignIn.Screens.EmailReceived}
                    name={SignInRoutes.EmailSignInRecievedAlt}
                />
                <AppStack.Screen
                    component={SignIn.Screens.EmailReceived}
                    name={SignInRoutes.EmailSignInRecieved}
                />
            </AppStack.Navigator>
        </AppMockingProvider>
    )
}
