import AppNavigator from '@/components/AppNavigator'
import { appNavConfig } from '@/components/AppProd'
import MockAppProvider from '@/components/MockAppProvider'
import SignInLinkRedirectScreen from '@/components/SignInLinkRedirectScreen'
import { firebaseAuth } from '@/mocks/environments/mocked'
import setupFirebaseAuthState from '@/mocks/environments/setupFirebaseAuthState'
import setupSignInEmail from '@/mocks/environments/setupSignInEmail'
import { buildSignInParams } from '@/mocks/factories/buildSignInParams'
import RootStack, { RootStackRoutes } from '@/rootStack'
import { TestRenderOptions } from '@/types/render'
import { loadAppExtra } from '@/utils/expo'
import { renderAware } from '@/utils/testing'
import urqlMockingClient from '@/utils/urql'
import { addURLParams, getURLParams } from '@/utils/web'
import { Route } from '@react-navigation/native'
import { waitFor, act } from '@testing-library/react-native'

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

// SETUP

export const buildWithLink = ({ platform }: { platform: 'web' | 'mobile' }) => {
    const { APP_URL, FIREBASE_AUTH_URL } = loadAppExtra()

    const [baseUrl, redirectRoute] =
        platform === 'web'
            ? [APP_URL, RootStackRoutes.SignInLinkRedirect]
            : [FIREBASE_AUTH_URL, RootStackRoutes.SignInLinkRedirectAlt]

    const redirectPath = appNavConfig.screens[redirectRoute]

    const params = buildSignInParams()

    const urlPath = new URL(redirectPath, baseUrl)

    addURLParams(urlPath, params)
    const path = urlPath.pathname + urlPath.search

    return {
        EMAIL: 'stored@mail.com',
        PARAMS: params,
        ROUTE: {
            name: redirectRoute,
            path,
            params
        }
    }
}

interface EmailReceivedRenderOptions
    extends TestRenderOptions<'button-only' | 'sign-in'> {
    route: Omit<Route<string>, 'key'>
    platform: 'web' | 'mobile'
}

export const renderWithLink = ({
    resolvers,
    setup,
    route,
    platform
}: EmailReceivedRenderOptions) => {
    const client = urqlMockingClient({ resolvers })

    return renderAware(
        <MockAppProvider initialRoute={route} client={client} withNavigation>
            {setup === 'button-only' ? (
                <RootStack.Navigator>
                    <RootStack.Screen
                        component={SignInLinkRedirectScreen}
                        name={
                            platform === 'web'
                                ? RootStackRoutes.SignInLinkRedirect
                                : RootStackRoutes.SignInLinkRedirectAlt
                        }
                    />
                </RootStack.Navigator>
            ) : (
                <AppNavigator />
            )}
        </MockAppProvider>
    )
}
