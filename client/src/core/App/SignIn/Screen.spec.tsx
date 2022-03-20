import { AppRootStackRoute } from '@/core/App/Root/Stack'
import AppMockProvider from '@/testing/AppMockProvider'
import { createRender } from '@/testing/render'
import AppRootNavigationContainer from '../Root/NavigationContainer'
import { AppRootStack } from '../Root/Stack'
import AuthSignInScreen from './Screen'

function setup() {
    return createRender((client) => (
        <AppMockProvider client={client}>
            <AppRootNavigationContainer>
                <AppRootStack.Navigator>
                    <AppRootStack.Screen
                        component={AuthSignInScreen}
                        name={AppRootStackRoute.AuthSignIn}
                    />
                </AppRootStack.Navigator>
            </AppRootNavigationContainer>
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
