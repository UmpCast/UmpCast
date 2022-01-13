import _FirebaseAuth from '@/tests/mocks/_FirebaseAuth'
import renderAppNavigator from '@/tests/renders/appNavigator'
import { act } from '@testing-library/react-native'

jest.mock('firebase/auth')

it('should redirect to registration when unregistered', async () => {
    // App Launches
    const { findByText, resolvers } = renderAppNavigator()

    const { listenForCallback, triggerAuthStateChanged } =
        _FirebaseAuth.mock.onAuthStateChanged()
    listenForCallback()
    resolvers.Query.isRegistered.mockReturnValue(false)

    await findByText(/loading/i)

    // Firebase responds with persistent user
    resolvers.Query.isRegistered.mockReturnValue(false)

    act(() => {
        triggerAuthStateChanged({
            hasAuth: true
        })
    })

    await findByText(/register/i)
})
