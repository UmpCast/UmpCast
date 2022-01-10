import AsyncStorage from '@react-native-async-storage/async-storage'
import { act, fireEvent } from '@testing-library/react-native'

import { EMAIL_SIGN_IN_KEY } from '@/constants'

import * as setup from './setup/user_sends_email'
import { stubResolvers } from '@/utils/testing'

it('should display it in the form when server provides errors', async () => {
    const resolvers = stubResolvers()
    const { VALID_EMAIL, EMAIL_ERROR } = setup.build()

    const { findByText, findByTestId } = setup.render({
        resolvers
    })

    // given email sends with errors
    resolvers.Mutation.sendSignInLink.mockReturnValue({
        errors: [EMAIL_ERROR]
    })

    // when valid form submitted
    fireEvent.changeText(await findByTestId('email-input'), VALID_EMAIL)
    fireEvent.press(await findByText(/continue with email/i))

    // then form displays errors
    await findByText(EMAIL_ERROR.message)
})

it('should submit an email sign in when input is valid', async () => {
    const resolvers = stubResolvers()
    const { VALID_EMAIL } = setup.build()

    const { findByText, findByTestId, getByText } = setup.render({
        resolvers
    })

    // given successful email send
    resolvers.Mutation.sendSignInLink.mockReturnValue({
        errors: null
    })

    // when form submitted
    fireEvent.changeText(await findByTestId('email-input'), VALID_EMAIL)
    fireEvent.press(await findByText(/continue with email/i))

    // then confirmation is shown
    await findByText(/check your email/i)
    getByText(VALID_EMAIL)
    // and email send is requested
    expect(resolvers.Mutation.sendSignInLink.mock.calls[0][1]).toMatchObject({
        email: VALID_EMAIL
    })
    // and email is stored locally
    expect(AsyncStorage.setItem).toBeCalledWith(EMAIL_SIGN_IN_KEY, VALID_EMAIL)
})
