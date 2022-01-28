import { NavigationContainer } from '@react-navigation/native'
import { fireEvent } from '@testing-library/react-native'

import { RootStack, RootStackRoutes } from '@/navigation'
import { createRender } from '@/mock/render'
import AppMockProvider from '@/core/App/Mock/Provider'
import AuthEmailSentConfirmation from './SentConfirmation'

const setup = ({ params }: any) =>
    createRender((client) => (
        <AppMockProvider client={client}>
            <NavigationContainer
                initialState={{
                    routes: [{ name: RootStackRoutes.SignInEmailSent, params }]
                }}
            >
                <RootStack.Navigator>
                    <RootStack.Screen
                        component={AuthEmailSentConfirmation}
                        name={RootStackRoutes.SignInEmailSent}
                    />
                </RootStack.Navigator>
            </NavigationContainer>
        </AppMockProvider>
    ))

it('should show confirmation when sign in link sent', async () => {
    const SENT_EMAIL = 'valid@gmail.com'

    const utils = setup({
        params: {
            email: SENT_EMAIL
        }
    })

    await utils.findByText(SENT_EMAIL)
})
