import { fireEvent, render, waitFor } from '@testing-library/react-native'

import { EMAIL_SIGN_IN_KEY } from '@/constants'
import asyncStorage from '@/test/mocks/@react-native-async-storage/async-storage'
import { createRender } from '@/test/setup'
import SignInEmailForm from '.'
import MockAppProvider from '@/test/components/MockAppProvider'

const setup = () => {
    const onSuccess = jest.fn()
    const utils = createRender((client) => (
        <MockAppProvider client={client}>
            <SignInEmailForm onSuccess={onSuccess} />
        </MockAppProvider>
    ))

    return {
        ...utils,
        onSuccess
    }
}

it('should send link when valid email provided', async () => {
    const VALID_EMAIL = 'valid@gmail.com'

    // Render form
    const utils = setup()

    const emailInput = await utils.findByTestId('email-input')
    const emailButton = await utils.findByText(/continue with email/i)

    // Email input filled and submitted
    utils.resolvers.Mutation.sendSignInLink.mockReturnValue({
        errors: null
    })

    fireEvent.changeText(emailInput, VALID_EMAIL)
    fireEvent.press(emailButton)

    await waitFor(() => {
        expect(
            utils.resolvers.Mutation.sendSignInLink.mock.calls[0][1]
        ).toMatchObject({
            email: VALID_EMAIL
        })
        expect(asyncStorage.setItem).toBeCalledWith(
            EMAIL_SIGN_IN_KEY,
            VALID_EMAIL
        )
    })
})

it('should be empty when shown', async () => {
    // Render form
    const utils = setup()

    const emailInput = await utils.findByTestId('email-input')
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

    const emailInput = await utils.findByTestId('email-input')
    const emailButton = await utils.findByText(/continue with email/i)

    // Email input filled and submitted
    utils.resolvers.Mutation.sendSignInLink.mockReturnValue({
        errors: [EMAIL_ERROR]
    })

    fireEvent.changeText(emailInput, VALID_EMAIL)
    fireEvent.press(emailButton)

    await utils.findByText(EMAIL_ERROR.message)
})
