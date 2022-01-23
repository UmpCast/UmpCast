import MockAppProvider from '@/test/components/MockAppProvider'
import Auth from '@/test/factories/AuthFactory'
import google from '@/test/mocks/expo-auth-session/providers/google'
import auth from '@/test/mocks/firebase/auth'
import { fireEvent, render, waitFor } from '@testing-library/react-native'
import GoogleButton from './GoogleButton'

jest.mock('firebase/auth')
jest.mock('expo-auth-session/providers/google')

const setup = () => {
    return render(<GoogleButton />, { wrapper: MockAppProvider })
}

it('should sign the user in when auth succeeds', async () => {
    const AUTH = Auth.Response()

    google.mock.useIdTokenRequest({
        type: 'success',
        idToken: AUTH.idToken
    })

    // App navigator renders & waits for firebase
    const utils = setup()

    const googleButton = await utils.findByText(/continue with google/i)

    // Google button pressed & user does auth exchange
    auth.GoogleAuthProvider.credential.mockReturnValue(AUTH.credential as any)

    fireEvent.press(googleButton)

    await waitFor(() => {
        expect(auth.GoogleAuthProvider.credential).toHaveBeenCalledWith(
            AUTH.idToken
        )
        expect(auth.signInWithCredential).toHaveBeenCalledWith(
            auth.getAuth(),
            AUTH.credential
        )
    })
})
