import { waitFor, act } from '@testing-library/react-native'

import { firebaseAuth } from '@/mocks/environments/mocked'
import setupFirebaseAuthState from '@/mocks/environments/setupFirebaseAuthState'
import setupSignInEmail from '@/mocks/environments/setupSignInEmail'
import { getURLParams } from '@/utils/web'

import { buildWithLink, renderWithLink } from './withLink.setup'

jest.mock('firebase/auth')

const PlATFORMS: Array<'web' | 'mobile'> = ['web', 'mobile']

it.each(PlATFORMS)(
    'signs the user into firebase when url is valid on %s',
    async (platform) => {
        const DATA = buildWithLink({ platform })

        setupSignInEmail({
            email: DATA.EMAIL,
            stored: true
        })

        renderWithLink({
            setup: 'button-only',
            route: DATA.ROUTE,
            platform
        })
        await waitFor(async () => {
            expect(firebaseAuth.signInWithEmailLink).toHaveBeenCalledWith(
                firebaseAuth.getAuth(),
                DATA.EMAIL,
                expect.anything()
            )

            const returnUrl = new URL(
                firebaseAuth.signInWithEmailLink.mock.calls[0][2] ?? ''
            )

            expect(getURLParams(returnUrl)).toMatchObject(DATA.PARAMS)
        })

        // mocks aren't cleared between 'it.each' tests
        jest.clearAllMocks()
    }
)

it('redirects the user to registration when unregistered', async () => {
    const DATA = buildWithLink({ platform: 'web' })

    const { triggerAuthStateChange } = setupFirebaseAuthState()
    setupSignInEmail({
        email: DATA.EMAIL,
        stored: true,
        properSignIn: {
            triggerAuthStateChange
        }
    })

    const resolvers = {
        Query: {
            isRegistered: jest.fn()
        }
    }
    resolvers.Query.isRegistered.mockReturnValue(false)
    const { findByText } = renderWithLink({
        resolvers,
        setup: 'sign-in',
        platform: 'web',
        route: DATA.ROUTE
    })
    await findByText(/loading/i)

    act(() => triggerAuthStateChange(false))
    await findByText(/register/i)
})

it('redirects the user to home when registered', async () => {
    const DATA = buildWithLink({ platform: 'web' })

    const { triggerAuthStateChange } = setupFirebaseAuthState()

    setupSignInEmail({
        email: DATA.EMAIL,
        stored: true,
        properSignIn: {
            triggerAuthStateChange
        }
    })

    const resolvers = {
        Query: {
            isRegistered: jest.fn()
        }
    }
    resolvers.Query.isRegistered.mockReturnValue(true)
    const { findByText } = renderWithLink({
        resolvers,
        setup: 'sign-in',
        platform: 'web',
        route: DATA.ROUTE
    })
    await findByText(/loading/i)

    act(() => triggerAuthStateChange(false))
    await findByText(/home/i)
})
