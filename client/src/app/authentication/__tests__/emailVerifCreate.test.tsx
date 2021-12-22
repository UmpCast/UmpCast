import React from 'react'
import { fireEvent, render } from '@testing-library/react-native'
import { graphql } from 'msw'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { UnauthStack } from '../containers/UnauthStack'

import MockAppProvider from '@/mock/components/MockAppProvider'
import mswDB from '@/mock/msw/mswDB'
import { EmailVerifCreateScreen, EmailVerifSentScreen } from '..'
import { mswServer } from '@/mock/msw/mswServer'

it('displays it in the form when the server responds with input errors', async () => {
    const TEST_EMAIL = 'verified_email@gmail.com'

    mswServer.use(
        graphql.mutation('SendEmailVerification', (_, res, ctx) =>
            res(
                ctx.data({
                    sendEmailVerification: {
                        errors: [
                            {
                                key: 'email',
                                message: 'email is already verified'
                            }
                        ]
                    }
                })
            )
        )
    )

    const { findByTestId, findByText, getByText } = render(
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

    const verifyButton = await findByText(/continue with email/i)
    fireEvent.press(verifyButton)

    await findByTestId('email-error')
    getByText('email is already verified')
})

it('submits an email sign in when the input is valid', async () => {
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
