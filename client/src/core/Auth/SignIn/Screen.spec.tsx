import AppMockProvider from '@/core/App/Mock/Provider'
import { createRender } from '@/mock/render'
import { RootStack, RootStackRoutes } from '@/navigation'
import AuthSignInScreen from './Screen'

function setup() {
    return createRender((client) => (
        <AppMockProvider client={client} withNavigation>
            <RootStack.Navigator>
                <RootStack.Screen
                    name={RootStackRoutes.AuthSignIn}
                    component={AuthSignInScreen}
                />
            </RootStack.Navigator>
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
