import AsyncStorage from '@react-native-async-storage/async-storage'
import { fireEvent, render } from '@testing-library/react-native'

import AppMockingProvider from '@/mock/components/AppMockingProvider'
import RootStack, { RootStackRoutes } from '@/navigation/rootStack'

import EmailSignInFormHOC from '../EmailFormContainer'
import EmailSignInSentHOC from '../EmailSentContainer'

it('displays it in the form when the server responds with input errors', async () => {
    const TEST_EMAIL = 'verified_email@gmail.com'

    const resolvers = {
        Mutation: {
            sendSignInLink: () => ({
                errors: [{ key: 'email', message: 'external email error' }]
            })
        }
    }

    const { findByTestId, findByText, getByText } = render(
        <AppMockingProvider resolvers={resolvers} withNavigation>
            <RootStack.Navigator>
                <RootStack.Screen
                    component={EmailSignInFormHOC}
                    name={RootStackRoutes.SignIn}
                />
            </RootStack.Navigator>
        </AppMockingProvider>
    )

    const emailInput = await findByTestId('email-input')
    fireEvent.changeText(emailInput, TEST_EMAIL)

    const verifyButton = await findByText(/continue with email/i)
    fireEvent.press(verifyButton)

    await findByTestId('email-error')
    getByText('external email error')
})

it('submits an email sign in when the input is valid', async () => {
    const TEST_EMAIL = 'valid_email@gmail.com'

    const mockSendSignInLink = jest.fn().mockReturnValueOnce({ errors: null })

    const resolvers = {
        Mutation: {
            sendSignInLink: mockSendSignInLink
        }
    }

    const { getByText, findByText, findByTestId } = render(
        <AppMockingProvider resolvers={resolvers} withNavigation>
            <RootStack.Navigator>
                <RootStack.Screen
                    component={EmailSignInFormHOC}
                    name={RootStackRoutes.SignIn}
                />
                <RootStack.Screen
                    component={EmailSignInSentHOC}
                    name={RootStackRoutes.SignInEmailSent}
                />
            </RootStack.Navigator>
        </AppMockingProvider>
    )

    const emailInput = await findByTestId('email-input')
    fireEvent.changeText(emailInput, TEST_EMAIL)

    const verifyButton = await findByText(/continue with email/i)
    fireEvent.press(verifyButton)

    await findByText(/check your email/i)
    getByText(TEST_EMAIL)

    expect(AsyncStorage.setItem).toHaveBeenCalledWith(
        '@umpcast:signin-email',
        TEST_EMAIL
    )
    expect(mockSendSignInLink).toHaveBeenCalledTimes(1)
})
