import { fireEvent, render, waitFor } from '@testing-library/react-native'

import MockAppProvider from '@/test/components/MockAppProvider'
import asyncStorage from '@/test/mocks/@react-native-async-storage/async-storage'
import auth from '@/test/mocks/firebase/auth'

import SignOutButton from './SignOutButton'

jest.mock('firebase/auth')

const setup = () => render(<SignOutButton />, { wrapper: MockAppProvider })

it('should sign user out', async () => {
    const utils = setup()

    const signOutButton = await utils.findByText(/sign out/i)

    fireEvent.press(signOutButton)

    await waitFor(() => expect(asyncStorage.clear).toBeCalled())
    await waitFor(() => expect(auth.signOut).toBeCalled())
})
