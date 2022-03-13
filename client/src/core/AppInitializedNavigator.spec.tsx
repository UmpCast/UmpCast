import { act } from '@testing-library/react-native'
import * as FirebaseAuth from 'firebase/auth'
import { mocked } from 'jest-mock'

import { BaseSetup } from '@/testing/setup'
import AppInitializedNavigator from './AppInitializedNavigator'

jest.mock('firebase/auth')

const { onAuthStateChanged } = mocked(FirebaseAuth, true)

class Setup extends BaseSetup {
    constructor() {
        super(<AppInitializedNavigator />)
    }
}

it('should show sign in when unauthenticated', async () => {
    const setup = new Setup()

    const api = setup.render()
    await api.findByText(/loading/i)

    act(() => {
        const callback = onAuthStateChanged.mock.calls[0][1] as any
        callback(null)
    })

    await api.findByText(/sign in/i)
})

it('should show registration when unauthorized', async () => {
    const setup = new Setup()
    const {
        Query: { viewer }
    } = setup.resolvers

    const api = setup.render()
    await api.findByText(/loading/i)

    viewer.mockImplementationOnce(() => null)
    act(() => {
        const callback = onAuthStateChanged.mock.calls[0][1] as any
        callback({})
    })
    await api.findByText(/register/i)
})

it('should show home when authorized', async () => {
    const setup = new Setup()
    const {
        Query: { viewer }
    } = setup.resolvers

    const api = setup.render()
    await api.findByText(/loading/i)

    viewer.mockImplementationOnce(() => ({
        id: 'user-1'
    }))
    act(() => {
        const callback = onAuthStateChanged.mock.calls[0][1] as any
        callback({})
    })
    await api.findByText(/groups/i)
})
