import { render as rtlRender } from '@testing-library/react-native'

import MockAppProvider from '@/components/MockAppProvider'
import SignInEmailForm from '@/components/SignInEmailForm'
import SignInEmailSentScreen from '@/components/SignInEmailSentScreen'
import RootStack, { RootStackRoutes } from '@/rootStack'
import { TestRenderOptions } from '@/types/render'
import urqlMockingClient from '@/utils/urql'

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

    return rtlRender(
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
}
