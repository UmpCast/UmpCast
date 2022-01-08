import AsyncStorage from '@react-native-async-storage/async-storage'
import { act } from '@testing-library/react-native'

import * as SignInMocks from '../mocks'

import { EMAIL_SIGN_IN_KEY } from '@/constants'

const resolvers = {
    Mutation: {
        sendSignInLink: jest.fn()
    }
}

const DATA = SignInMocks.emailForm.build()

it('displays it in the form when the server responds with input errors', async () => {
    resolvers.Mutation.sendSignInLink.mockReturnValue({
        errors: DATA.serverErrors
    })

    SignInMocks.emailForm.setup()

    const { typeEmail, clickContinue, findByText } =
        SignInMocks.emailForm.render({ resolvers })

    await act(() => typeEmail(DATA.email))
    await act(clickContinue)

    await findByText(DATA.serverErrors[0].message)
})

it('submits an email sign in when the input is valid', async () => {
    resolvers.Mutation.sendSignInLink.mockImplementationOnce((_, args) => {
        expect(args).toMatchObject({
            email: DATA.email
        })
        return {
            errors: null
        }
    })

    const { typeEmail, clickContinue, findByText, getByText } =
        SignInMocks.emailForm.render({ resolvers })

    await act(() => typeEmail(DATA.email))
    await act(clickContinue)

    await findByText(/check your email/i)
    getByText(DATA.email)
    expect(AsyncStorage.setItem).toBeCalledWith(EMAIL_SIGN_IN_KEY, DATA.email)
})
