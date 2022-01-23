import { NavigationContainer } from '@react-navigation/native'
import { fireEvent } from '@testing-library/react-native'

import { RootStack, RootStackRoutes } from '@/navigation'
import MockAppProvider from '@/test/components/MockAppProvider'
import { createRender } from '@/test/setup'

import SignInEmailSentScreen from '../SignInEmailSentScreen'
import SignInScreen from '../SignInScreen'

const setup = () =>
    createRender((client) => (
        <MockAppProvider client={client}>
            <NavigationContainer
                initialState={{ routes: [{ name: RootStackRoutes.SignIn }] }}
            >
                <RootStack.Navigator>
                    <RootStack.Screen
                        component={SignInScreen}
                        name={RootStackRoutes.SignIn}
                    />
                    <RootStack.Screen
                        component={SignInEmailSentScreen}
                        name={RootStackRoutes.SignInEmailSent}
                    />
                </RootStack.Navigator>
            </NavigationContainer>
        </MockAppProvider>
    ))

it('should show confirmation when sign in link sent', async () => {
    const VALID_EMAIL = 'valid@gmail.com'

    const utils = setup()

    const emailInput = await utils.findByTestId('email-input')
    const emailButton = await utils.findByText(/continue with email/i)

    // Email input filled and submitted
    utils.resolvers.Mutation.sendSignInLink.mockReturnValue({
        errors: null
    })

    fireEvent.changeText(emailInput, VALID_EMAIL)
    fireEvent.press(emailButton)

    await utils.findByText(/check your email/i)
    await utils.findByText(VALID_EMAIL)
})
