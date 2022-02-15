import { NavigationContainer } from '@react-navigation/native'
import { act } from '@testing-library/react-native'
import * as FirebaseAuth from 'firebase/auth'
import { mocked } from 'jest-mock'

import { createRender } from '@/mock/render'

import AppMockProvider from '../Mock/Provider'

import AppInitializedNavigator from './Navigator'
import AppNavigationContainer from '../Navigation/Container'

jest.mock('firebase/auth')

const { onAuthStateChanged } = mocked(FirebaseAuth, true)

const setup = () =>
    createRender((client) => (
        <AppMockProvider client={client}>
            <AppNavigationContainer>
                <AppInitializedNavigator />
            </AppNavigationContainer>
        </AppMockProvider>
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

    await findByText(/groups/i)
})
