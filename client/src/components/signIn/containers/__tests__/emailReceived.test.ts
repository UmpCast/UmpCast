import { waitFor, act } from '@testing-library/react-native'

import * as appMocks from '@/components/app/containers/mocks'
import { firebaseAuth } from '@/utils/mock'
import { getURLParams } from '@/utils/web'

import * as signInMocks from '../mocks'

jest.mock('firebase/auth')

const DATA = signInMocks.emailReceived.build()
const PlATFORMS: Array<'web' | 'mobile'> = ['web', 'mobile']
it.each(PlATFORMS)(
    'signs the user into firebase when url is valid on $platform',
    async (platform) => {
        const PLATFORM_DATA = DATA[platform]

        signInMocks.emailReceived.setup({
            email: DATA.email,
            stored: true
        })

        signInMocks.emailReceived.render({
            setup: 'button-only',
            route: PLATFORM_DATA.route
        })

        await waitFor(async () => {
            expect(firebaseAuth.signInWithEmailLink).toHaveBeenCalledWith(
                firebaseAuth.getAuth(),
                DATA.email,
                expect.anything()
            )

            const returnUrl = new URL(
                firebaseAuth.signInWithEmailLink.mock.calls[0][2] ?? ''
            )

            expect(getURLParams(returnUrl)).toMatchObject(DATA.params)
        })
    }
)

it('redirects the user to registration when unregistered', async () => {
    const { triggerAuthStateChange } = appMocks.InitializedApp.setup()

    signInMocks.emailReceived.setup({
        email: DATA.email,
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

    const { findByText } = signInMocks.emailReceived.render({
        resolvers,
        setup: 'sign-in',
        route: DATA.web.route
    })

    await findByText(/loading/i)

    act(() => triggerAuthStateChange(false))

    await findByText(/register/i)
})

it('redirects the user to home when registered', async () => {
    const { triggerAuthStateChange } = appMocks.InitializedApp.setup()

    signInMocks.emailReceived.setup({
        email: DATA.email,
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

    const { findByText } = signInMocks.emailReceived.render({
        resolvers,
        setup: 'sign-in',
        route: DATA.web.route
    })

    await findByText(/loading/i)

    act(() => triggerAuthStateChange(false))

    await findByText(/home/i)
})

jest.mock('firebase/auth')
