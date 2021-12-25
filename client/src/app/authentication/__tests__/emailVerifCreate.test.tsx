import React from 'react'
import { fireEvent, render } from '@testing-library/react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { UnauthStack } from '../containers/UnauthStack'

import mswDB from '@/mock/msw/mswDB'
import { EmailVerifCreateScreen, EmailVerifSentScreen } from '..'
import AppMockingProvider from '@/mock/components/AppMockingProvider'

it('displays it in the form when the server responds with input errors', async () => {
    const TEST_EMAIL = 'verified_email@gmail.com'

    const { findByTestId, findByText, getByText } = render(
        <AppMockingProvider>
            <UnauthStack.Navigator>
                <UnauthStack.Screen
                    component={EmailVerifCreateScreen}
                    name="EmailVerification"
                />
            </UnauthStack.Navigator>
        </AppMockingProvider>
    )

    const emailInput = await findByTestId('email-input')
    fireEvent.changeText(emailInput, TEST_EMAIL)

    const verifyButton = await findByText(/continue with email/i)
    fireEvent.press(verifyButton)

    await findByTestId('email-error')
    getByText('email is already verified')
})

it('submits an email sign in when the input is valid', async () => {
    const TEST_EMAIL = 'valid_email@gmail.com'

    const { getByText, findByText, findByTestId } = render(
        <AppMockingProvider>
            <UnauthStack.Navigator>
                <UnauthStack.Screen
                    component={EmailVerifCreateScreen}
                    name="EmailVerification"
                />
                <UnauthStack.Screen
                    component={EmailVerifSentScreen}
                    name="VerificationSent"
                />
            </UnauthStack.Navigator>
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
    expect(mswDB.emailVerification.count()).toBe(1)
    expect(mswDB.emailVerification.getAll()[0]).toMatchObject({
        email: TEST_EMAIL
    })
})
