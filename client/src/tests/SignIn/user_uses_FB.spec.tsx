import { act, waitFor } from '@testing-library/react-native'

import { firebaseAuth, facebookNative } from '@/mocks/environments/mocked'
import setupSignInFB from '@/mocks/environments/setupSignInFB'

import * as setup from './setup/user_uses_FB'

jest.mock('firebase/auth')
jest.mock('expo-facebook')
jest.mock('expo-auth-session/providers/facebook')
jest.mock('@/utils/native')

it('signs the user into Firebase when valid FB account provided on web', async () => {
    const { AUTH } = setup.build()

    const { promptAsync } = setupSignInFB({
        platform: 'web',
        sessionHook: 'success',
        accessToken: AUTH.accessToken,
        credential: AUTH.credential
    })

    const { clickContinue } = setup.display()

    await act(clickContinue)

    await waitFor(() => {
        expect(promptAsync).toBeCalled()
        expect(firebaseAuth.FacebookAuthProvider.credential).toBeCalledWith(
            AUTH.accessToken
        )
        expect(firebaseAuth.signInWithCredential).toBeCalledWith(
            firebaseAuth.getAuth(),
            AUTH.credential
        )
    })
})

it('signs the user into Firebase when valid FB account provided on mobile', async () => {
    const { AUTH } = setup.build()

    setupSignInFB({
        platform: 'ios',
        accessToken: AUTH.accessToken,
        credential: AUTH.credential
    })

    const { clickContinue } = setup.display()

    await act(clickContinue)

    await waitFor(() => {
        expect(facebookNative.logInWithReadPermissionsAsync).toBeCalled()
        expect(firebaseAuth.FacebookAuthProvider.credential).toBeCalledWith(
            AUTH.accessToken
        )
        expect(firebaseAuth.signInWithCredential).toBeCalledWith(
            firebaseAuth.getAuth(),
            AUTH.credential
        )
    })
})
