import { act, fireEvent, waitFor } from '@testing-library/react-native'

import * as setup from './setup/user_uses_FB'
import { _Facebook } from '@/mocks/modules/_ExpoAuthSession'
import _Native from '@/mocks/modules/_Native'
import _FirebaseAuth from '@/mocks/modules/_FirebaseAuth'
import _ExpoFacebook from '@/mocks/modules/_ExpoFacebook'
import { PlATFORMS } from '@/utils/testing'

jest.mock('firebase/auth')
jest.mock('expo-facebook')
jest.mock('expo-auth-session/providers/facebook')
jest.mock('@/utils/native')

it.each(PlATFORMS)(
    'can sign the user into Firebase when on %s',
    async (platform) => {
        const { AUTH } = setup.build()

        // depending on platform
        _Native.mock.getPlatform(platform)
        // given successful auth...
        if (platform === 'web') {
            _Facebook.mock.useAuthRequest({
                type: 'success',
                accessToken: AUTH.accessToken
            })
        } else {
            _Facebook.mock.useAuthRequest({
                type: 'filler'
            })
            _ExpoFacebook.mock.logInWithReadPermissionsAsync({
                accessToken: AUTH.accessToken
            })
        }

        const { findByText } = setup.render()

        // and sign in
        _FirebaseAuth.mock.authProviderCredential({
            provider: 'facebook',
            credential: AUTH.credential
        })

        // when button clicked
        fireEvent.press(await findByText(/continue with facebook/i))

        await waitFor(() => {
            // then credential is retrieved ...
            expect(
                _FirebaseAuth.FacebookAuthProvider.credential
            ).toBeCalledWith(AUTH.accessToken)
            // and firebase is signed into
            expect(_FirebaseAuth.signInWithCredential).toBeCalledWith(
                _FirebaseAuth.getAuth(),
                AUTH.credential
            )
        })
    }
)
