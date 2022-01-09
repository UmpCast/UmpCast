import { render, fireEvent } from '@testing-library/react-native'

import AppMockingProvider from '@/components/MockAppProvider'
import SignInEmailForm from '@/components/SignInEmailForm'
import SignInEmailSentScreen from '@/components/SignInEmailSentScreen'
import RootStack, { RootStackRoutes } from '@/rootStack'
import { TestRenderOptions } from '@/types/render'
import urqlMockingClient from '@/utils/urql'

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
