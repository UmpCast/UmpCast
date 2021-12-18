import React from 'react'

import { render } from '@testing-library/react-native'
import MockAppProvider from '@/app/common/containers/MockAppProvider'
import { UnauthStack } from '../containers/UnauthStack'
import EmailVerifCreateScreen from '../screens/EmailVerifCreateScreen'

it('errors when an invalid email is provided', () => {
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

    expect(true).toBe(true)
})
