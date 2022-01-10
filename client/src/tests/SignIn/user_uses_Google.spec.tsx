import { act, waitFor } from '@testing-library/react-native'

import { firebaseAuth } from '@/mocks/environments/mocked'
import { setupSignInGoogle } from '@/mocks/environments/setupSignInGoogle'

import * as setup from './setup/user_uses_Google'

jest.mock('expo-auth-session/providers/google')
jest.mock('firebase/auth')

it('signs the user into Firebase when valid Google account provided', async () => {
    const { AUTH } = setup.build()

    const { promptAsync } = setupSignInGoogle({
        idToken: AUTH.idToken,
        credential: AUTH.credential
    })

    const { clickContinue } = setup.display()

    await act(clickContinue)

    await waitFor(() => {
        expect(promptAsync).toHaveBeenCalledWith()
        expect(firebaseAuth.GoogleAuthProvider.credential).toHaveBeenCalledWith(
            AUTH.idToken
        )
        expect(firebaseAuth.signInWithCredential).toHaveBeenCalledWith(
            firebaseAuth.getAuth(),
            AUTH.credential
        )
    })
})
