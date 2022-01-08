import { act, waitFor } from '@testing-library/react-native'

import { firebaseAuth } from '@/utils/mock'

import * as signInMock from '../mocks'

jest.mock('expo-auth-session/providers/google')
jest.mock('firebase/auth')

const DATA = signInMock.googleButton.build()

it('signs the user into Firebase when valid Google account provided', async () => {
    const { promptAsync } = signInMock.googleButton.setup({
        idToken: DATA.idToken,
        credential: DATA.credential
    })

    const { clickContinue } = signInMock.googleButton.render({})

    await act(clickContinue)

    await waitFor(() => {
        expect(promptAsync).toHaveBeenCalledWith()
        expect(firebaseAuth.GoogleAuthProvider.credential).toHaveBeenCalledWith(
            DATA.idToken
        )
        expect(firebaseAuth.signInWithCredential).toHaveBeenCalledWith(
            firebaseAuth.getAuth(),
            DATA.credential
        )
    })
})
