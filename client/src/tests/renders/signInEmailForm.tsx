import MockAppProvider from '@/components/MockAppProvider'
import SignInEmailForm from '@/components/organisms/SignInEmailForm'
import SignInEmailSentScreen from '@/components/screens/SignInEmailSentScreen'
import RootStack, { RootStackRoutes } from '@/rootStack'

import { createRender } from '../setup'

export default function renderSignInEmailForm() {
    return createRender((client) => (
        <MockAppProvider client={client} withNavigation>
            <RootStack.Navigator>
                <RootStack.Screen
                    component={SignInEmailForm}
                    name={RootStackRoutes.SignIn}
                />
                <RootStack.Screen
                    component={SignInEmailSentScreen}
                    name={RootStackRoutes.SignInEmailSent}
                />
            </RootStack.Navigator>
        </MockAppProvider>
    ))
}
