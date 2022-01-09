import AsyncStorage from '@react-native-async-storage/async-storage'
import { act } from '@testing-library/react-native'

import { EMAIL_SIGN_IN_KEY } from '@/constants'

import { buildOnEmailSend, renderOnEmailSend } from './onEmailSend.setup'

it('displays it in the form when the server responds with input errors', async () => {
    const resolvers = {
        Mutation: {
            sendSignInLink: jest.fn()
        }
    }

    const { VALID_EMAIL, EMAIL_ERROR } = buildOnEmailSend()

    resolvers.Mutation.sendSignInLink.mockImplementation(() => ({
        errors: [EMAIL_ERROR]
    }))

    const { typeEmail, clickContinue, findByText } = renderOnEmailSend({
        resolvers
    })

    await act(() => typeEmail(VALID_EMAIL))
    await act(clickContinue)

    await findByText(EMAIL_ERROR.message)
})

it('submits an email sign in when the input is valid', async () => {
    const resolvers = {
        Mutation: {
            sendSignInLink: jest.fn()
        }
    }

    const { VALID_EMAIL } = buildOnEmailSend()

    resolvers.Mutation.sendSignInLink.mockImplementationOnce((_, args) => {
        expect(args).toMatchObject({
            email: VALID_EMAIL
        })
        return {
            errors: null
        }
    })

    const { typeEmail, clickContinue, findByText, getByText } =
        renderOnEmailSend({ resolvers })

    await act(() => typeEmail(VALID_EMAIL))
    await act(clickContinue)

    await findByText(/check your email/i)
    getByText(VALID_EMAIL)
    expect(AsyncStorage.setItem).toBeCalledWith(EMAIL_SIGN_IN_KEY, VALID_EMAIL)
})
