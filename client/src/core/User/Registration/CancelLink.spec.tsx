import asyncStorage from '@react-native-async-storage/async-storage'
import { fireEvent, render, waitFor } from '@testing-library/react-native'

import AppMockProvider from '@/core/App/Mock/Provider'
import firebaseAuth from '@/testing/modules/firebaseAuth'

import CancelLink from './CancelLink'

jest.mock('firebase/auth')

const setup = () => render(<CancelLink />, { wrapper: AppMockProvider })

it('should sign the user out', async () => {
    const utils = setup()

    const signOutButton = await utils.findByText(/cancel registration/i)

    fireEvent.press(signOutButton)

    await waitFor(() => expect(asyncStorage.clear).toBeCalled())
    await waitFor(() => expect(firebaseAuth.signOut).toBeCalled())
})
