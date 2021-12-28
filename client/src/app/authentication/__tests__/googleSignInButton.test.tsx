import { fireEvent, render, waitFor } from '@testing-library/react-native'
import * as GoogleSession from 'expo-auth-session/providers/google'
import * as FirebaseAuth from 'firebase/auth'
import { mocked } from 'jest-mock'
import { useState } from 'react'
import AppMockingProvider from '@/mock/components/AppMockingProvider'
import GoogleSignInButtonHOC from '../containers/GoogleSignInButtonHOC'

jest.mock('expo-auth-session/providers/google')
jest.mock('firebase/auth')

it('signs the user into Firebase when valid Google account provided', async () => {
    const TEST_TOKEN = 'test-token'

    const mFirebaseAuth = mocked(FirebaseAuth, true)
    const mGoogleSession = mocked(GoogleSession)
    const mPromptAsync = jest.fn()

    mGoogleSession.useIdTokenAuthRequest.mockImplementation((): any => {
        const [response, setResponse] = useState<any>(null)

        mPromptAsync.mockImplementation(() => {
            setResponse({
                type: 'success',
                params: { id_token: TEST_TOKEN }
            })
        })

        return [{}, response, mPromptAsync]
    })

    const { findByRole } = render(
        <AppMockingProvider>
            <GoogleSignInButtonHOC />
        </AppMockingProvider>
    )

    const TEST_CREDENTIAL = 'test-credential'
    mFirebaseAuth.GoogleAuthProvider.credential.mockReturnValue(
        TEST_CREDENTIAL as any
    )
    const googleButton = await findByRole('button')
    fireEvent.press(googleButton)
    await waitFor(() => {
        expect(mPromptAsync).toHaveBeenCalledWith()
        expect(
            mFirebaseAuth.GoogleAuthProvider.credential
        ).toHaveBeenCalledWith(TEST_TOKEN)
        expect(mFirebaseAuth.signInWithCredential).toHaveBeenCalledWith(
            mFirebaseAuth.getAuth(),
            TEST_CREDENTIAL
        )
    })
})
