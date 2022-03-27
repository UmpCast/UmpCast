import {
    AppRootStack,
    AppRootStackRoute
} from '@/navigation/navigators/Root/Stack'
import AppMockProvider from '@/testing/AppMockProvider'
import { createRender } from '@/testing/render'

import AppNavigationContainer from '../../navigation/Container'

import AuthSignInScreen from '.'

function setup() {
    return createRender((client) => (
        <AppMockProvider client={client}>
            <AppNavigationContainer>
                <AppRootStack.Navigator>
                    <AppRootStack.Screen
                        component={AuthSignInScreen}
                        name={AppRootStackRoute.AuthSignIn}
                    />
                </AppRootStack.Navigator>
            </AppNavigationContainer>
        </AppMockProvider>
    ))
}

it('should display correctly when shown', async () => {
    const utils = setup()

    await utils.findByText(/sign in \/ sign up/i)
    await utils.findByText(/continue with google/i)
    await utils.findByText(/continue with facebook/i)
    await utils.findByText(/or/i)
    await utils.findByText(/continue with email/i)
})
