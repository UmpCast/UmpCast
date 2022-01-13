import AsyncStorage from '@react-native-async-storage/async-storage'
import { fireEvent, render } from '@testing-library/react-native'

import { EMAIL_SIGN_IN_KEY } from '@/constants'
import { stubResolvers, waitForRender } from '@/utils/testing'
import renderSignInEmailForm from '@/tests/renders/signInEmailForm'

it('should send link when valid email provided', async () => {
    const VALID_EMAIL = 'valid@gmail.com'

    // Render form
    const { findByText, findByTestId, getByText, resolvers } =
        renderSignInEmailForm()

    const emailInput = await findByTestId('email-input')
    const emailButton = await findByText(/continue with email/i)

    // Email input filled and submitted
    resolvers.Mutation.sendSignInLink.mockReturnValue({
        errors: null
    })

    fireEvent.changeText(emailInput, VALID_EMAIL)
    fireEvent.press(emailButton)

    await findByText(/check your email/i)
    getByText(VALID_EMAIL)
    expect(resolvers.Mutation.sendSignInLink.mock.calls[0][1]).toMatchObject({
        email: VALID_EMAIL
    })
    expect(AsyncStorage.setItem).toBeCalledWith(EMAIL_SIGN_IN_KEY, VALID_EMAIL)
})

describe('should perform standard form functionality', () => {
    test('by rendering correctly when displayed', async () => {
        // Render form
        const { findByTestId } = renderSignInEmailForm()

        const emailInput = await findByTestId('email-input')
        expect(emailInput).toHaveProp('value', '')
    })

    test('by showing them when form contains errors', async () => {
        // Render form
        const { findByText } = renderSignInEmailForm()

        const emailButton = await findByText(/continue with email/i)

        //Submit empty form
        fireEvent.press(emailButton)

        await findByText(/is required/i)
    })

    test('by showing them when server responds with errors', async () => {
        const VALID_EMAIL = 'valid@gmail.com'
        const EMAIL_ERROR = {
            key: 'email',
            message: 'external email error'
        }

        // Render form
        const { findByText, findByTestId, resolvers } = renderSignInEmailForm()

        const emailInput = await findByTestId('email-input')
        const emailButton = await findByText(/continue with email/i)

        // Email input filled and submitted
        resolvers.Mutation.sendSignInLink.mockReturnValue({
            errors: [EMAIL_ERROR]
        })

        fireEvent.changeText(emailInput, VALID_EMAIL)
        fireEvent.press(emailButton)

        await findByText(EMAIL_ERROR.message)
    })
})
