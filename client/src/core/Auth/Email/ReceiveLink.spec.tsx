import { EMAIL_SIGN_IN_KEY } from '@/constants/storage'
import asyncStorage from '@/mock/modules/asyncStorage'
import { createRender } from '@/mock/render'

import { AuthFactory } from '../factory'
import AppMockProvider from '@/core/App/Mock/Provider'
import { NavigationContainer } from '@react-navigation/native'
import { RootStack, RootStackRoutes } from '@/navigation'
import AuthEmailReceiveEntry from './ReceiveLink'
import firebaseAuth from '@/mock/modules/firebaseAuth'
import { getURLParams } from '@/utils/web'
import { waitFor } from '@testing-library/react-native'

jest.mock('firebase/auth')

it('should sign user in when link valid', async () => {
    const STORED_EMAIL = 'stored@gmail.com'
    const PARAMS = AuthFactory.signInParams()

    asyncStorage.getItem.mockResolvedValue(STORED_EMAIL)

    createRender((client) => (
        <AppMockProvider client={client}>
            <NavigationContainer
                initialState={{
                    routes: [
                        {
                            name: RootStackRoutes.AuthEmailReceiveLink,
                            params: PARAMS
                        }
                    ]
                }}
            >
                <RootStack.Navigator>
                    <RootStack.Screen
                        name={RootStackRoutes.AuthEmailReceiveLink}
                        component={AuthEmailReceiveEntry}
                    />
                </RootStack.Navigator>
            </NavigationContainer>
        </AppMockProvider>
    ))

    await waitFor(() => {
        expect(asyncStorage.getItem).toBeCalledWith(EMAIL_SIGN_IN_KEY)
        expect(firebaseAuth.signInWithEmailLink).toHaveBeenCalledWith(
            firebaseAuth.getAuth(),
            STORED_EMAIL,
            expect.anything()
        )
        const returnUrl = new URL(
            firebaseAuth.signInWithEmailLink.mock.calls[0][2] ?? ''
        )
        expect(getURLParams(returnUrl)).toMatchObject(PARAMS)
    })
})
