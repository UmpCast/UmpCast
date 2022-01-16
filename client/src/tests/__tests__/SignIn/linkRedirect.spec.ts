import { act } from '@testing-library/react-native'

import Navigator from '@/tests/factories/Navigator'
import _AsyncStorage from '@/tests/mocks/_AsyncStorage'
import _FirebaseAuth from '@/tests/mocks/_FirebaseAuth'
import renderAppNavigator from '@/tests/renders/appNavigator'
import { getURLParams } from '@/utils/web'

jest.mock('firebase/auth')

describe('should sign in when valid email link used', () => {
    beforeEach(() => {
        // mocks aren't cleared between 'it.each' tests
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
            const STORED_EMAIL = 'stored@gmail.com'
            const PARAMS = Navigator.signInLinkParams()
            const ROUTE = Navigator.signInRoute({ platform, params: PARAMS })

            // App renders & waits for Firebase
            const { findByText, resolvers } = renderAppNavigator({
                route: ROUTE
            })

            const { listenForCallback, triggerAuthStateChanged } =
                _FirebaseAuth.mock.onAuthStateChanged()
            listenForCallback()
            resolvers.Query.isRegistered.mockReturnValue(false)
            _AsyncStorage.mock.storedEmail(STORED_EMAIL)

            await findByText(/loading/i)

            // Firebase returns unauthenticated user
            _FirebaseAuth.mock.signInWithEmailLink({
                type: 'success',
                triggerAuthStateChanged
            })
            resolvers.Query.isRegistered.mockReturnValue(registered)

            act(() => triggerAuthStateChanged({ hasAuth: false }))

            if (registered) await findByText(/home/i)
            else await findByText(/register/i)
            expect(_FirebaseAuth.signInWithEmailLink).toHaveBeenCalledWith(
                _FirebaseAuth.getAuth(),
                STORED_EMAIL,
                expect.anything()
            )
            const returnUrl = new URL(
                _FirebaseAuth.signInWithEmailLink.mock.calls[0][2] ?? ''
            )
            expect(getURLParams(returnUrl)).toMatchObject(PARAMS)
        }
    )
})
