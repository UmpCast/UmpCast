import MockAppProvider from '@/components/MockAppProvider'
import asyncStorage from '@/tests/mocks/@react-native-async-storage/async-storage'
import auth from '@/tests/mocks/firebase/auth'
import { fireEvent, render, waitFor } from '@testing-library/react-native'
import CancelRegistrationLink from './CancelRegistrationLink'

jest.mock('firebase/auth')

const setup = () => {
    return render(
        <CancelRegistrationLink />,
        {wrapper: MockAppProvider}
    )
}

it('should sign user out', async () => {
    const utils = setup()

    const signOutButton = await utils.findByText(/sign out/i)

    fireEvent.press(signOutButton)

    await waitFor(() => expect(asyncStorage.clear).toBeCalled())
    await waitFor(() => expect(auth.signOut).toBeCalled())
})