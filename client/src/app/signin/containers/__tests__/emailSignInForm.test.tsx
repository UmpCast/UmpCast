import { fireEvent, render } from '@testing-library/react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'

import AppMockingProvider from '@/mock/components/AppMockingProvider'
import EmailSignInFormHOC from '../EmailSignInForm'
import EmailSignInSentHOC from '../EmailSignInSent'
import AppStack from '@/app/navigation/components/AppStack'
import { SignInRoutes } from '../../utils/signInNavigation'

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
            <AppStack.Navigator>
                <AppStack.Screen
                    component={EmailSignInFormHOC}
                    name={SignInRoutes.SignIn}
                />
            </AppStack.Navigator>
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
            <AppStack.Navigator>
                <AppStack.Screen
                    component={EmailSignInFormHOC}
                    name={SignInRoutes.SignIn}
                />
                <AppStack.Screen
                    component={EmailSignInSentHOC}
                    name={SignInRoutes.EmailSignInSent}
                />
            </AppStack.Navigator>
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
