import { act, waitFor } from '@testing-library/react-native'

import { firebaseAuth, facebookNative } from '@/mocks/environments/mocked'
import setupSignInFB from '@/mocks/environments/setupSignInFB'

import { buildWithFB, renderWithFB } from './withFB.setup'

jest.mock('firebase/auth')
jest.mock('expo-facebook')
jest.mock('expo-auth-session/providers/facebook')
jest.mock('@/utils/native')

it('signs the user into Firebase when valid FB account provided on web', async () => {
    const { AUTH } = buildWithFB()

    const { promptAsync } = setupSignInFB({
        platform: 'web',
        sessionHook: 'success',
        accessToken: AUTH.accessToken,
        credential: AUTH.credential
    })

    const { clickContinue } = renderWithFB()

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
    const { AUTH } = buildWithFB()

    setupSignInFB({
        platform: 'ios',
        accessToken: AUTH.accessToken,
        credential: AUTH.credential
    })

    const { clickContinue } = renderWithFB({})

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
