import { RootStack, RootStackRoute } from '@/navigation/navigators/Root/Stack'
import AppMockProvider from '@/testing/AppMockProvider'
import { createRender } from '@/testing/render'

import AppNavigationContainer from '../../navigation/Container'

import SignInScreen from '.'

function setup() {
    return createRender((client) => (
        <AppMockProvider client={client}>
            <AppNavigationContainer>
                <RootStack.Navigator>
                    <RootStack.Screen
                        component={SignInScreen}
                        name={RootStackRoute.Signin}
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
