import { UnauthStack } from '../containers/UnauthStack'
import EmailVerifCreateScreen from '../screens/EmailVerifCreateScreen'
import EmailVerifSentScreen from '../screens/EmailVerifSentScreen'
import React from 'react'

import { fireEvent, render } from '@testing-library/react-native'
import MockAppProvider from '@/app/common/containers/MockAppProvider'
import mswDB from '@/msw/mswDB'

it('errors when an invalid email is provided', async () => {
    const TEST_EMAIL = 'invalid_email'

    const { findByTestId, findByText } = render(
        <MockAppProvider>
            <UnauthStack.Navigator>
                <UnauthStack.Screen
                    component={EmailVerifCreateScreen}
                    name="EmailVerification"
                />
            </UnauthStack.Navigator>
        </MockAppProvider>
    )

    const emailInput = await findByTestId('email-input')
    fireEvent.changeText(emailInput, TEST_EMAIL)

    const verifyButton = await findByText('Verify')
    fireEvent.press(verifyButton)

    await findByTestId('email-error')
})

it('submits an email verification and shows a confirmation screen when a valid email provided', async () => {
    const TEST_EMAIL = 'valid_email@gmail.com'

    const { getByText, findByText, findByTestId } = render(
        <MockAppProvider>
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
        </MockAppProvider>
    )

    const emailInput = await findByTestId('email-input')
    fireEvent.changeText(emailInput, TEST_EMAIL)

    const verifyButton = await findByText('Verify')
    fireEvent.press(verifyButton)

    await findByText('Verify your Email')
    getByText(TEST_EMAIL)

    expect(mswDB.emailVerification.count()).toBe(1)
    expect(mswDB.emailVerification.getAll()[0]).toMatchObject({
        email: TEST_EMAIL,
        route: '/verify'
    })
})
