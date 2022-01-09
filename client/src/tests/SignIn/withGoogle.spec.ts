import { act, waitFor } from '@testing-library/react-native'

import { firebaseAuth } from '@/mocks/environments/mocked'
import { setupSignInGoogle } from '@/mocks/environments/setupSignInGoogle'

import { buildWithGoogle, renderWithGoogle } from './withGoogle.setup'

jest.mock('expo-auth-session/providers/google')
jest.mock('firebase/auth')

it('signs the user into Firebase when valid Google account provided', async () => {
    const { AUTH } = buildWithGoogle()

    const { promptAsync } = setupSignInGoogle({
        idToken: AUTH.idToken,
        credential: AUTH.credential
    })

    const { clickContinue } = renderWithGoogle({})

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
