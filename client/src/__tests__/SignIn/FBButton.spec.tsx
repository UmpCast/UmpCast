import { IResolvers } from '@graphql-tools/utils'
import {
    act,
    fireEvent,
    render as rtlRender
} from '@testing-library/react-native'

import AppNavigator from '@/components/AppNavigator'
import MockAppProvider from '@/components/MockAppProvider'
import Auth from '@/factories/Auth'
import { _Facebook } from '@/mocks/_ExpoAuthSession'
import _ExpoFacebook from '@/mocks/_ExpoFacebook'
import _FirebaseAuth from '@/mocks/_FirebaseAuth'
import _Native from '@/mocks/_Native'
import { stubResolvers } from '@/utils/testing'
import urqlMockingClient from '@/utils/urql'

jest.mock('firebase/auth')
jest.mock('expo-facebook')
jest.mock('expo-auth-session/providers/facebook')
jest.mock('@/utils/native')

function render({ resolvers }: { resolvers: IResolvers }) {
    return rtlRender(
        <MockAppProvider
            client={urqlMockingClient({ resolvers })}
            withNavigation
        >
            <AppNavigator />
        </MockAppProvider>
    )
}

describe('should sign in when valid social auth provided', () => {
    beforeEach(() => {
        jest.clearAllMocks()
    })

    test.each`
        platform    | registered
        ${'web'}    | ${true}
        ${'web'}    | ${false}
        ${'mobile'} | ${true}
        ${'mobile'} | ${false}
    `(
        'and redirect correctly when registered = $registered on $platform',
        async ({ platform, registered }) => {
            const AUTH = Auth.Response()
            const resolvers = stubResolvers()

            const { findByText } = render({ resolvers })

            // App navigator renders & waits for firebase
            _Native.mock.getPlatform(platform)
            const { listenForCallback, triggerAuthStateChanged } =
                _FirebaseAuth.mock.onAuthStateChanged()
            listenForCallback()
            resolvers.Query.isRegistered.mockReturnValue(false)
            if (platform === 'web') {
                _Facebook.mock.useAuthRequest({
                    type: 'success',
                    accessToken: AUTH.accessToken
                })
            } else if (platform === 'mobile') {
                _Facebook.mock.useAuthRequest({
                    type: 'filler'
                })
                _ExpoFacebook.mock.logInWithReadPermissionsAsync({
                    accessToken: AUTH.accessToken
                })
            }

            await findByText(/loading/i)

            // Firebase returns unauthenticated user
            act(() => triggerAuthStateChanged({ hasAuth: false }))

            const facebookbutton = await findByText(/continue with facebook/i)

            // Facebook button pressed & user does auth exchange
            _FirebaseAuth.mock.authProviderCredential({
                provider: 'facebook',
                credential: AUTH.credential
            })
            _FirebaseAuth.mock.signInWithCredential({
                type: 'success',
                triggerAuthStateChanged
            })
            resolvers.Query.isRegistered.mockReturnValue(registered)

            fireEvent.press(facebookbutton)

            if (registered) await findByText(/home/i)
            else await findByText(/register/i)
            expect(
                _FirebaseAuth.FacebookAuthProvider.credential
            ).toBeCalledWith(AUTH.accessToken)
            expect(_FirebaseAuth.signInWithCredential).toBeCalledWith(
                _FirebaseAuth.getAuth(),
                AUTH.credential
            )
        }
    )
})
