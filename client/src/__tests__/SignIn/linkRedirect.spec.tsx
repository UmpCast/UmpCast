import { waitFor, act } from '@testing-library/react-native'

import { createRender, stubResolvers } from '@/utils/testing'
import { getURLParams } from '@/utils/web'

import _FirebaseAuth from '@/mocks/_FirebaseAuth'
import _AsyncStorage from '@/mocks/_AsyncStorage'
import MockAppProvider from '@/components/MockAppProvider'
import Navigator from '@/factories/Navigator'
import AppNavigator from '@/components/AppNavigator'
import { render as rtlRender } from '@testing-library/react-native'
import { IResolvers } from '@graphql-tools/utils'
import urqlMockingClient from '@/utils/urql'

jest.mock('firebase/auth')

function render({ route, resolvers }: { route: any; resolvers: IResolvers }) {
    return rtlRender(
        <MockAppProvider
            initialRoute={route}
            client={urqlMockingClient({ resolvers })}
            withNavigation
        >
            <AppNavigator />
        </MockAppProvider>
    )
}

describe('should sign in when valid email link used', () => {
    beforeEach(() => {
        // mocks aren't cleared between 'it.each' tests
        jest.clearAllMocks()
    })

    it.each`
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
            const { listenForCallback, triggerAuthStateChanged } =
                _FirebaseAuth.mock.onAuthStateChanged()
            listenForCallback()
            const resolvers = stubResolvers()
            resolvers.Query.isRegistered.mockReturnValue(false)
            _AsyncStorage.mock.storedEmail(STORED_EMAIL)

            const { findByText } = render({
                route: ROUTE,
                resolvers
            })

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
