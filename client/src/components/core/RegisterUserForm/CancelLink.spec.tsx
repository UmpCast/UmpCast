import { fireEvent, render, waitFor } from '@testing-library/react-native'

import MockAppProvider from '@/test/components/MockAppProvider'
import asyncStorage from '@/test/mocks/@react-native-async-storage/async-storage'
import auth from '@/test/mocks/firebase/auth'

import CancelLink from './CancelLink'

jest.mock('firebase/auth')

const setup = () => render(<CancelLink />, { wrapper: MockAppProvider })

it('should sign user out', async () => {
    const utils = setup()

    const signOutButton = await utils.findByText(/cancel registration/i)

    fireEvent.press(signOutButton)

    await waitFor(() => expect(asyncStorage.clear).toBeCalled())
    await waitFor(() => expect(auth.signOut).toBeCalled())
})
