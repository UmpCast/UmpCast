import AppMockProvider from '@/core/App/Mock/Provider'
import AppNavigationContainer from '@/core/App/Navigation/Container'
import { RootStack, RootStackRoutes } from '@/core/App/Root/Stack'
import { createRender } from '@/mock/render'

import AuthSignInScreen from './Screen'

function setup() {
    return createRender((client) => (
        <AppMockProvider client={client}>
            <AppNavigationContainer>
                <RootStack.Navigator>
                    <RootStack.Screen
                        component={AuthSignInScreen}
                        name={RootStackRoutes.AuthSignIn}
                    />
                </RootStack.Navigator>
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
