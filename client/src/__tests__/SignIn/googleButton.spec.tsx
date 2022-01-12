import AppNavigator from '@/components/AppNavigator'
import MockAppProvider from '@/components/MockAppProvider'
import SignInWithGoogleButton from '@/components/SignInWithGoogleButton'
import Auth from '@/factories/Auth'
import buildAuth from '@/factories/Auth'
import { _Google } from '@/mocks/_ExpoAuthSession'
import _FirebaseAuth from '@/mocks/_FirebaseAuth'
import { createRender } from '@/utils/testing'
import { act, fireEvent, waitFor } from '@testing-library/react-native'

jest.mock('expo-auth-session/providers/google')
jest.mock('firebase/auth')

function render() {
    return createRender((client) => (
        <MockAppProvider client={client} withNavigation>
            <AppNavigator />
        </MockAppProvider>
    ))
}

describe('should sign in when valid google auth provided', () => {
    beforeEach(() => {
        jest.clearAllMocks()
    })

    it.each`
        registered
        ${true}
        ${false}
    `(
        'and redirect correctly when registered = $registered',
        async ({ registered }) => {
            const AUTH = Auth.Response()

            const { findByText, resolvers } = render()

            // App navigator renders & waits for firebase
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
