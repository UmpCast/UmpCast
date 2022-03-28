import { fireEvent, waitFor } from '@testing-library/react-native'

import { EMAIL_SIGN_IN_KEY } from '@/config/constants/storage'
import { RootStack, RootStackRoute } from '@/navigation/navigators/Root/Stack'
import AppMockProvider from '@/testing/AppMockProvider'
import asyncStorage from '@/testing/modules/asyncStorage'
import { createRender } from '@/testing/render'
import { TestID } from '@/testing/testID'

import AppNavigationContainer from '../../navigation/Container'

import LoginScreen from '.'

function setup() {
    return createRender((client) => (
        <AppMockProvider client={client}>
            <AppNavigationContainer>
                <RootStack.Navigator>
                    <RootStack.Screen
                        component={LoginScreen}
                        name={RootStackRoute.Login}
                    />
                </RootStack.Navigator>
            </AppNavigationContainer>
        </AppMockProvider>
    ))
}

it('should display correctly when shown', async () => {
    const utils = setup()

    await utils.findByText(/login/i)
    await utils.findByText(/continue with google/i)
    await utils.findByText(/continue with facebook/i)
    await utils.findByText(/or/i)
    await utils.findByText(/continue with email/i)

    const emailInput = await utils.findById(TestID.FORM_INPUT, 'email')
    expect(emailInput).toHaveProp('value', '')
})

it('should send link when valid email provided', async () => {
    const utils = setup()
    const emailInput = await utils.findById(TestID.FORM_INPUT, 'email')
    const emailButton = await utils.findByText(/continue with email/i)

    fireEvent.changeText(emailInput, 'user1@gmail.com')

    utils.resolvers.Mutation.sendSignInLink.mockReturnValue({
        errors: []
    })
    fireEvent.press(emailButton)
    await waitFor(() => {
        expect(
            utils.resolvers.Mutation.sendSignInLink.mock.calls[0][1]
        ).toMatchObject({
            input: {
                email: 'user1@gmail.com'
            }
        })
        expect(asyncStorage.setItem).toBeCalledWith(
            EMAIL_SIGN_IN_KEY,
            'user1@gmail.com'
        )
    })
})

it('should be empty when shown', async () => {
    // Render form
    const utils = setup()

    const emailInput = await utils.findById(TestID.FORM_INPUT, 'email')
    expect(emailInput).toHaveProp('value', '')
})

it('should perform validation when submitted', async () => {
    // Render form
    const utils = setup()

    const emailButton = await utils.findByText(/continue with email/i)

    // Submit empty form
    fireEvent.press(emailButton)

    await utils.findByText(/is required/i)
})

it('should show errors when server provides them', async () => {
    const VALID_EMAIL = 'valid@gmail.com'
    const EMAIL_ERROR = {
        key: 'email',
        message: 'external email error'
    }
    // Render form
    const utils = setup()

    const emailInput = await utils.findById(TestID.FORM_INPUT, 'email')
    const emailButton = await utils.findByText(/continue with email/i)

    // Email input filled and submitted
    utils.resolvers.Mutation.sendSignInLink.mockReturnValue({
        errors: [EMAIL_ERROR]
    })

    fireEvent.changeText(emailInput, VALID_EMAIL)
    fireEvent.press(emailButton)

    await utils.findByText(EMAIL_ERROR.message)
})
