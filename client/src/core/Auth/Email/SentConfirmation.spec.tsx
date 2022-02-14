import { NavigationContainer } from '@react-navigation/native'

import AppMockProvider from '@/core/App/Mock/Provider'
import { RootStack, RootStackRoutes } from '@/core/App/Root/Stack'
import { createRender } from '@/mock/render'

import AuthEmailSentConfirmation from './SentConfirmation'

const setup = ({ params }: any) =>
    createRender((client) => (
        <AppMockProvider client={client}>
            <NavigationContainer
                initialState={{
                    routes: [{ name: RootStackRoutes.AuthEmailSent, params }]
                }}
            >
                <RootStack.Navigator>
                    <RootStack.Screen
                        component={AuthEmailSentConfirmation}
                        name={RootStackRoutes.AuthEmailSent}
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
