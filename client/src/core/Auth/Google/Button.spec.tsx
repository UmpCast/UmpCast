import { fireEvent, render, waitFor } from '@testing-library/react-native'

import AppMockProvider from '@/core/App/Mock/Provider'
import firebaseAuth from '@/mock/modules/firebaseAuth'
import sessionGoogle from '@/mock/modules/sessionGoogle'

import { AuthFactory } from '../factory'

import GoogleButton from './Button'

jest.mock('firebase/auth')
jest.mock('expo-auth-session/providers/google')

const setup = () => render(<GoogleButton />, { wrapper: AppMockProvider })

it('should sign the user in when auth succeeds', async () => {
    const AUTH = AuthFactory.response()

    sessionGoogle.mock.useIdTokenAuthRequest({
        type: 'success',
        idToken: AUTH.idToken
    })

    // App navigator renders & waits for firebase
    const utils = setup()

    const googleButton = await utils.findByText(/continue with google/i)

    // Google button pressed & user does auth exchange
    firebaseAuth.GoogleAuthProvider.credential.mockReturnValue(
        AUTH.credential as any
    )

    fireEvent.press(googleButton)

    await waitFor(() => {
        expect(firebaseAuth.GoogleAuthProvider.credential).toHaveBeenCalledWith(
            AUTH.idToken
        )
        expect(firebaseAuth.signInWithCredential).toHaveBeenCalledWith(
            firebaseAuth.getAuth(),
            AUTH.credential
        )
    })
})