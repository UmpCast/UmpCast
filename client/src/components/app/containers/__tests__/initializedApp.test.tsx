import { AuthState } from '@/apollo/generated'
import RootStack, { RootStackRoutes } from '@/navigation/rootStack'
import { render, waitFor, act } from '@testing-library/react-native'
import InitializedApp from '../InitializedApp'
import { Text } from 'native-base'

import * as firebaseAuth from 'firebase/auth'
import { mocked } from 'jest-mock'
import AppMockingProvider from '@/mock/components/AppMockingProvider'
import { IMocks } from '@graphql-tools/mock'

jest.mock('firebase/auth')

const HomeScreen = () => <Text>Home</Text>
const RegisterScreen = () => <Text>Register</Text>
const SignInScreen = () => <Text>Sign in</Text>

const setup = (mocks: IMocks) => {
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
        ...utils
    }
}

const mockOnAuthStateChanged = () => {
    const mFirebaseAuth = mocked(firebaseAuth, true)

    const mOnAuthStateChanged = jest.fn()

    mFirebaseAuth.getAuth.mockReturnValue({
        onAuthStateChanged: mOnAuthStateChanged
    } as any)

    return mOnAuthStateChanged
}

it('navigates correctly when auth state changes', async () => {
    let callback: any = null
    mockOnAuthStateChanged().mockImplementation((cb) => {
        callback = cb
        return () => {}
    })

    const { findByText } = setup({
        Query: {
            me: () => null
        }
    })

    await findByText(/loading/i)

    act(() => {
        callback(null)
    })

    await findByText(/sign in/i)

    act(() => {
        callback({})
    })

    await findByText(/register/i)
})

it('shows registration when signed in to firebase', () => {})

it('shows the home page when registered', () => {})
