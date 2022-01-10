import { fireEvent } from '@testing-library/react-native'

import MockAppProvider from '@/components/MockAppProvider'
import SignInEmailForm from '@/components/SignInEmailForm'
import SignInEmailSentScreen from '@/components/SignInEmailSentScreen'
import RootStack, { RootStackRoutes } from '@/rootStack'
import { TestRenderOptions } from '@/types/render'
import urqlMockingClient from '@/utils/urql'
import { extendedRender } from '@/utils/testing'

export function build() {
    return {
        VALID_EMAIL: 'valid@mail.com',
        EMAIL_ERROR: {
            key: 'email',
            message: 'external email error'
        }
    }
}

export function render({ resolvers }: TestRenderOptions<'default'>) {
    const client = urqlMockingClient({ resolvers })

    const utils = extendedRender(
        <MockAppProvider client={client} withNavigation>
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
