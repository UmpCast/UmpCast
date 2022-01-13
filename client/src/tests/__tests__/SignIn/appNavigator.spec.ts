import { act } from '@testing-library/react-native'

import _FirebaseAuth from '@/tests/mocks/_FirebaseAuth'
import renderAppNavigator from '@/tests/renders/appNavigator'

jest.mock('firebase/auth')

it('should redirect to sign in when unauthenticated', async () => {
    // App Launches
    const { findByText, resolvers } = renderAppNavigator()

    const { listenForCallback, triggerAuthStateChanged } =
        _FirebaseAuth.mock.onAuthStateChanged()
    listenForCallback()
    resolvers.Query.isRegistered.mockReturnValue(false)

    await findByText(/loading/i)

    // Firebase responds with empty auth
    act(() => {
        triggerAuthStateChanged({
            hasAuth: false
        })
    })

    await findByText(/sign in/i)
})
