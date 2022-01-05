import {
    AuthState,
    GetAuthStateDocument,
    GetAuthStateQuery
} from '@/apollo/generated'
import RootStack, { RootStackRoutes } from '@/navigation/rootStack'
import { render, act } from '@testing-library/react-native'
import InitializedApp from '../InitializedApp'
import { Text } from 'native-base'

import * as firebaseAuth from 'firebase/auth'
import { mocked } from 'jest-mock'
import AppMockingProvider from '@/mock/components/AppMockingProvider'
import appCache from '@/apollo/appCache'
import { IMocks } from '@graphql-tools/mock'

jest.mock('firebase/auth')

const HomeScreen = () => <Text>Home</Text>
const RegisterScreen = () => <Text>Register</Text>
const SignInScreen = () => <Text>Sign in</Text>

const setup = (mocks: IMocks | undefined = undefined) => {
    const mFirebaseAuth = mocked(firebaseAuth, true)

    const mOnAuthStateChanged = jest.fn()

    mFirebaseAuth.getAuth.mockReturnValue({
        onAuthStateChanged: mOnAuthStateChanged
    } as any)

    const utils = render(
        <AppMockingProvider mocks={mocks} withNavigation>
            <InitializedApp
                renderProtectedScreens={(authState) => {
                    switch (authState) {
                        case AuthState.Authenticated:
                            return (
                                <RootStack.Screen
                                    component={HomeScreen}
                                    name={RootStackRoutes.Home}
                                />
                            )
                        case AuthState.Unregistered:
                            return (
                                <RootStack.Screen
                                    component={RegisterScreen}
                                    name={RootStackRoutes.Register}
                                />
                            )
                        case AuthState.Unauthenticated:
                        default:
                            return (
                                <RootStack.Screen
                                    component={SignInScreen}
                                    name={RootStackRoutes.SignIn}
                                />
                            )
                    }
                }}
            />
        </AppMockingProvider>
    )

    return {
        mOnAuthStateChanged,
        ...utils
    }
}

const updateAuthState = (authState: AuthState | null) =>
    appCache.writeQuery<GetAuthStateQuery>({
        query: GetAuthStateDocument,
        data: {
            authState
        }
    })

it('navigates correctly when auth state updated', async () => {
    const { findByText } = setup({
        Query: {
            me: () => null // indicates user is unregistered
        }
    })

    await findByText(/loading/i)

    // due to Google/Facebook/Email sign in
    act(() => {
        updateAuthState(AuthState.Unregistered)
    })

    await findByText(/register/i)

    // Due to Google/Facebook/Email sign in
    act(() => {
        updateAuthState(AuthState.Authenticated)
    })

    await findByText(/home/i)

    // due to sign out
    act(() => {
        updateAuthState(AuthState.Unauthenticated)
    })

    await findByText(/sign in/i)
})

it('shows registration when unregistered user loads app', async () => {
    const { mOnAuthStateChanged, findByText } = setup({
        Query: {
            me: () => null // indicates user is unregistered
        }
    })

    await findByText(/loading/i)

    // firebase indicates persisted user
    act(() => {
        const handleOnAuthStateChanged = mOnAuthStateChanged.mock.calls[0][0]
        const mUser = {}
        handleOnAuthStateChanged(mUser)
    })

    await findByText(/register/i)
})

it('shows the home page when authenticated user loads app', async () => {
    // no mock indicates user is registered
    const { mOnAuthStateChanged, findByText } = setup()

    await findByText(/loading/i)

    // firebase indicates persisted user
    act(() => {
        const handleOnAuthStateChanged = mOnAuthStateChanged.mock.calls[0][0]
        const mUser = {}
        handleOnAuthStateChanged(mUser)
    })

    await findByText(/home/i)
})
