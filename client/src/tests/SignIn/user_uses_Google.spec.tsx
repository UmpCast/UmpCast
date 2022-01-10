import { _Google } from '@/mocks/modules/_ExpoAuthSession'
import firebaseAuth from '@/mocks/modules/_FirebaseAuth'
import { fireEvent, waitFor } from '@testing-library/react-native'

import * as setup from './setup/user_uses_Google'

jest.mock('expo-auth-session/providers/google')
jest.mock('firebase/auth')

it('should sign the user into firebase when valid auth provided', async () => {
    const { AUTH } = setup.build()

    // given successful google auth
    _Google.mock.useAuthRequest({
        idToken: AUTH.idToken
    })

    const { findByText } = setup.render()

    // and successful firebase sign in
    firebaseAuth.mock.authProviderCredential({
        provider: 'google',
        credential: AUTH.credential
    })

    // when google continue button clicked
    fireEvent.press(await findByText(/continue with google/i))

    await waitFor(() => {
        // then credential should be retrieved correctly
        expect(firebaseAuth.GoogleAuthProvider.credential).toHaveBeenCalledWith(
            AUTH.idToken
        )
        // and firebase should be signed into
        expect(firebaseAuth.signInWithCredential).toHaveBeenCalledWith(
            firebaseAuth.getAuth(),
            AUTH.credential
        )
    })
})
