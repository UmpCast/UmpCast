import { IResolvers } from '@graphql-tools/utils'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { fireEvent, render as rtlRender } from '@testing-library/react-native'

import MockAppProvider from '@/components/MockAppProvider'
import SignInEmailForm from '@/components/SignInEmailForm'
import SignInEmailSentScreen from '@/components/SignInEmailSentScreen'
import { EMAIL_SIGN_IN_KEY } from '@/constants'
import RootStack, { RootStackRoutes } from '@/rootStack'
import { stubResolvers } from '@/utils/testing'
import urqlMockingClient from '@/utils/urql'

function render({ resolvers }: { resolvers?: IResolvers }) {
    return rtlRender(
        <MockAppProvider
            client={urqlMockingClient({ resolvers })}
            withNavigation
        >
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
        </MockAppProvider>
    )
}

it('should submit an email sign in when input is valid', async () => {
    const VALID_EMAIL = 'valid@gmail.com'
    const resolvers = stubResolvers()

    // Render form
    const { findByText, findByTestId, getByText } = render({ resolvers })

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

it('should display it in the form when server provides errors', async () => {
    const VALID_EMAIL = 'valid@gmail.com'
    const EMAIL_ERROR = {
        key: 'email',
        message: 'external email error'
    }
    const resolvers = stubResolvers()

    // Render form
    const { findByText, findByTestId } = render({ resolvers })

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
