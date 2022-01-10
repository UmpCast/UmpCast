import { waitFor, act } from '@testing-library/react-native'

import { getURLParams } from '@/utils/web'

import * as setup from './setup/user_uses_link'
import asyncStorage from '@/mocks/modules/_AsyncStorage'
import firebaseAuth from '@/mocks/modules/_FirebaseAuth'
import { PlATFORMS, stubResolvers } from '@/utils/testing'

jest.mock('firebase/auth')

it.each(PlATFORMS)(
    'signs the user into firebase when url is valid on %s',
    async (platform) => {
        const { EMAIL, PARAMS, ROUTE } = setup.build({ platform })

        // given email stored
        asyncStorage.mock.storedEmail(EMAIL)

        // when navigated to link redirect
        setup.render({
            uses: 'button-only',
            route: ROUTE
        })

        await waitFor(async () => {
            // then sign in is called with the correct email
            expect(firebaseAuth.signInWithEmailLink).toHaveBeenCalledWith(
                firebaseAuth.getAuth(),
                EMAIL,
                expect.anything()
            )

            const returnUrl = new URL(
                firebaseAuth.signInWithEmailLink.mock.calls[0][2] ?? ''
            )

            // and correct params
            expect(getURLParams(returnUrl)).toMatchObject(PARAMS)
        })

        // mocks aren't cleared between 'it.each' tests
        jest.clearAllMocks()
    }
)

it.each(
    PlATFORMS.flatMap((platform) => [
        {
            platform,
            registered: true,
            state: 'registered',
            redirect: 'home'
        },
        {
            platform,
            registered: false,
            state: 'unregistered',
            redirect: 'registration'
        }
    ])
)(
    'redirects the user to $redirect when $state on $platform',
    async ({ platform, registered }) => {
        const resolvers = stubResolvers()

        const { EMAIL, ROUTE } = setup.build({ platform })

        const { listenForCallback, triggerAuthStateChanged } =
            firebaseAuth.mock.onAuthStateChanged()

        listenForCallback()

        const { findByText } = setup.render({
            resolvers,
            uses: 'entire-app',
            route: ROUTE
        })

        await findByText(/loading/i)

        // given stored email, successful sign in
        asyncStorage.mock.storedEmail(EMAIL)
        firebaseAuth.mock.signInWithEmailLink({
            type: 'success',
            triggerAuthStateChanged
        })
        // and the registration status
        resolvers.Query.isRegistered.mockReturnValue(registered)

        act(() => triggerAuthStateChanged({ hasAuth: false }))

        // then it redirects correctly
        if (registered) await findByText(/home/i)
        else await findByText(/register/i)

        // mocks aren't cleared between 'it.each' tests
        jest.clearAllMocks()
    }
)
