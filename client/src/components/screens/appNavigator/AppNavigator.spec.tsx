import { act } from '@testing-library/react-native'

import { createRender } from '@/tests/setup'
import MockAppProvider from '@/components/MockAppProvider'
import AppNavigator from '@/components/screens/appNavigator/AppNavigator'

import * as FirebaseAuth from 'firebase/auth'
import { mocked } from 'jest-mock'
import { interpret } from 'xstate'
import { authMachine, AuthService } from '@/machines/authMachine'

jest.mock('firebase/auth')

const { onAuthStateChanged } = mocked(FirebaseAuth, true)

const setup = () =>
    createRender((client) => (
        <MockAppProvider client={client} withNavigation>
            <AppNavigator />
        </MockAppProvider>
    ))

it('should show sign in when unauthenticated', async () => {
    // App Launches
    const { findByText } = setup()

    await findByText(/loading/i)

    // Firebase responds

    act(() => {
        const callback = onAuthStateChanged.mock.calls[0][1] as any
        callback(null)
    })

    await findByText(/sign in/i)
})

it('should show registration when unauthorized', async () => {
    // App Launches
    const { findByText, resolvers } = setup()

    await findByText(/loading/i)

    // Firebase responds
    resolvers.Query.isRegistered.mockReturnValue(false)

    act(() => {
        const callback = onAuthStateChanged.mock.calls[0][1] as any
        callback({})
    })

    await findByText(/register/i)
})

it('should show home when authorized', async () => {
    // App Launches
    const { findByText, resolvers } = setup()

    await findByText(/loading/i)

    // Firebase responds
    resolvers.Query.isRegistered.mockReturnValue(true)

    act(() => {
        const callback = onAuthStateChanged.mock.calls[0][1] as any
        callback({})
    })

    await findByText(/home/i)
})
