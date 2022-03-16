import { fireEvent, waitFor } from '@testing-library/react-native'

import { EMAIL_SIGN_IN_KEY } from '@/config/constants/storage'
import asyncStorage from '@/testing/modules/asyncStorage'
import { createRender } from '@/testing/render'

import AppMockProvider from '../../../testing/AppMockProvider'
import AuthEmailForm from './AuthSignInSendEmailLinkForm'

const setup = () => {
    const onSend = jest.fn()
    const utils = createRender((client) => (
        <AppMockProvider client={client}>
            <AuthEmailForm onSend={onSend} />
        </AppMockProvider>
    ))

    return utils
}

it('should send link when valid email provided', async () => {
    const utils = setup()
    const emailInput = await utils.findByTestId('email-input')
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
