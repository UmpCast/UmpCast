import { act, fireEvent, waitFor } from '@testing-library/react-native'

import Auth from '@/tests/factories/Auth'
import { _Google } from '@/tests/mocks/_ExpoAuthSession'
import _FirebaseAuth from '@/tests/mocks/_FirebaseAuth'
import renderAppNavigator from '@/tests/renders/appNavigator'

jest.mock('expo-auth-session/providers/google')
jest.mock('firebase/auth')

describe('should sign in when valid google auth provided', () => {
    beforeEach(() => {
        jest.clearAllMocks()
    })

    test.each`
        registered
        ${true}
        ${false}
    `(
        'and redirect correctly when registered = $registered',
        async ({ registered }) => {
            const AUTH = Auth.Response()

            // App navigator renders & waits for firebase
            const { findByText, resolvers } = renderAppNavigator()

            const { listenForCallback, triggerAuthStateChanged } =
                _FirebaseAuth.mock.onAuthStateChanged()
            listenForCallback()
            resolvers.Query.isRegistered.mockReturnValue(false)
            _Google.mock.useAuthRequest({
                idToken: AUTH.idToken
            })

            await findByText(/loading/i)

            // Firebase returns unauthenticated user
            act(() => triggerAuthStateChanged({ hasAuth: false }))

            const googleButton = await findByText(/continue with google/i)

            // Google button pressed & user does auth exchange
            _FirebaseAuth.mock.authProviderCredential({
                provider: 'google',
                credential: AUTH.credential
            })
            _FirebaseAuth.mock.signInWithCredential({
                type: 'success',
                triggerAuthStateChanged
            })
            resolvers.Query.isRegistered.mockReturnValue(registered)

            fireEvent.press(googleButton)

            await waitFor(() => {
                expect(
                    _FirebaseAuth.GoogleAuthProvider.credential
                ).toHaveBeenCalledWith(AUTH.idToken)
                expect(_FirebaseAuth.signInWithCredential).toHaveBeenCalledWith(
                    _FirebaseAuth.getAuth(),
                    AUTH.credential
                )
            })

            if (registered) await findByText(/home/i)
            else await findByText(/register/i)
        }
    )
})
