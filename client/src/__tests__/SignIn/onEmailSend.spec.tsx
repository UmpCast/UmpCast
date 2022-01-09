import AsyncStorage from '@react-native-async-storage/async-storage'
import { act, fireEvent, render } from '@testing-library/react-native'

import { EMAIL_SIGN_IN_KEY } from '@/constants'

import AppMockingProvider from '@/components/MockAppProvider'
import RootStack, { RootStackRoutes } from '@/rootStack'
import urqlMockingClient from '@/utils/urql'
import SignInEmailSentScreen from '@/components/SignInEmailSentScreen'
import { TestRenderOptions } from '@/types/render'
import SignInEmailForm from '@/components/SignInEmailForm'

it('displays it in the form when the server responds with input errors', async () => {
    const resolvers = {
        Mutation: {
            sendSignInLink: jest.fn()
        }
    }

    const { VALID_EMAIL, EMAIL_ERROR } = buildOnEmailSend()

    resolvers.Mutation.sendSignInLink.mockImplementation(() => {
        return {
            errors: [EMAIL_ERROR]
        }
    })

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

export function buildOnEmailSend() {
    return {
        VALID_EMAIL: 'valid@mail.com',
        EMAIL_ERROR: {
            key: 'email',
            message: 'external email error'
        }
    }
}

export function renderOnEmailSend({ resolvers }: TestRenderOptions<'default'>) {
    const client = urqlMockingClient({ resolvers })

    const utils = render(
        <AppMockingProvider client={client} withNavigation>
            <RootStack.Navigator>
                <RootStack.Screen
                    component={SignInEmailForm}
                    name={RootStackRoutes.SignIn}
                />
                <RootStack.Screen
                    component={SignInEmailSentScreen}
                    name={RootStackRoutes.SignInEmailSent}
                />
            </RootStack.Navigator>
        </AppMockingProvider>
    )

    const typeEmail = async (email: string) =>
        fireEvent.changeText(await utils.findByTestId('email-input'), email)
    const clickContinue = async () =>
        fireEvent.press(await utils.findByText(/continue with email/i))

    return {
        typeEmail,
        clickContinue,
        ...utils
    }
}
