import * as SignInMocks from '../mocks'

import { act, waitFor } from '@testing-library/react-native'
import { firebaseAuth, facebookNative } from '@/utils/mock'

jest.mock('firebase/auth')
jest.mock('expo-facebook')
jest.mock('expo-auth-session/providers/facebook')
jest.mock('@/utils/native')

const DATA = SignInMocks.facebookButton.build()
it('signs the user into Firebase when valid FB account provided on web', async () => {
    const { promptAsync } = SignInMocks.facebookButton.setup({
        platform: 'web',
        sessionHook: 'success',
        accessToken: DATA.accessToken,
        credential: DATA.credential
    })

    const { clickContinue } = SignInMocks.facebookButton.render({})

    await act(clickContinue)

    await waitFor(() => {
        expect(promptAsync).toBeCalled()
        expect(firebaseAuth.FacebookAuthProvider.credential).toBeCalledWith(
            DATA.accessToken
        )
        expect(firebaseAuth.signInWithCredential).toBeCalledWith(
            firebaseAuth.getAuth(),
            DATA.credential
        )
    })
})

it('signs the user into Firebase when valid FB account provided on mobile', async () => {
    SignInMocks.facebookButton.setup({
        platform: 'ios',
        accessToken: DATA.accessToken,
        credential: DATA.credential
    })

    const { clickContinue } = SignInMocks.facebookButton.render({})

    await act(clickContinue)

    await waitFor(() => {
        expect(facebookNative.logInWithReadPermissionsAsync).toBeCalled()
        expect(firebaseAuth.FacebookAuthProvider.credential).toBeCalledWith(
            DATA.accessToken
        )
        expect(firebaseAuth.signInWithCredential).toBeCalledWith(
            firebaseAuth.getAuth(),
            DATA.credential
        )
    })
})
