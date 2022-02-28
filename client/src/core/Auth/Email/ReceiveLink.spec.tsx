import { NavigationContainer } from '@react-navigation/native'
import { waitFor } from '@testing-library/react-native'

import { EMAIL_SIGN_IN_KEY } from '@/constants/storage'
import AppMockProvider from '@/core/App/Mock/Provider'
import { RootStack, RootStackRoutes } from '@/core/App/Root/Stack'
import asyncStorage from '@/mock/modules/asyncStorage'
import firebaseAuth from '@/mock/modules/firebaseAuth'
import { createRender } from '@/mock/render'
import { getURLParams } from '@/utils/web'

import { AuthFactory } from '../factory'

import AuthEmailReceiveEntry from './ReceiveLink'

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
                        component={AuthEmailReceiveEntry}
                        name={RootStackRoutes.AuthEmailReceiveLink}
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
