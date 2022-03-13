import { NavigationContainer } from '@react-navigation/native'
import { waitFor } from '@testing-library/react-native'

import { EMAIL_SIGN_IN_KEY } from '@/config/constants/storage'
import asyncStorage from '@/testing/modules/asyncStorage'
import firebaseAuth from '@/testing/modules/firebaseAuth'
import { createRender } from '@/testing/render'
import { getURLParams } from '@/utils/web'
import AppMockProvider from './AppMockProvider'
import { RootStackRoutes, RootStack } from './AppRootStack'
import AuthEmailReceiveEntry from './AuthEmailReceiveLink'
import { AuthFactory } from './Authfactory'

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
