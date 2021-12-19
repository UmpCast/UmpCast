import React from 'react'

import { fireEvent, render } from '@testing-library/react-native'
import { graphql } from 'msw'
import MockAppProvider from '@/app/common/containers/MockAppProvider'
import { UnauthStack } from '../containers/UnauthStack'
import EmailVerifCreateScreen from '../screens/EmailVerifCreateScreen'

graphql.mutation('SendEmailVerification', (_, res, ctx) =>
    res(
        ctx.data({
            sendEmailVerification: null
        })
    )
)

it('errors when an invalid email is provided', async () => {
    const INVALID_EMAIL = 'notanemail'

    const { findByTestId, getByText } = render(
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

    fireEvent.changeText(emailInput, INVALID_EMAIL)

    const verifyButton = getByText('Verify')

    fireEvent.press(verifyButton)

    await findByTestId('email-error')
})

it('submits an email verification and shows a confirmation screen when a valid email provided', () => {
    render(
        <MockAppProvider>
            <UnauthStack.Navigator>
                <UnauthStack.Screen
                    component={EmailVerifCreateScreen}
                    name="EmailVerification"
                />
            </UnauthStack.Navigator>
        </MockAppProvider>
    )
})
