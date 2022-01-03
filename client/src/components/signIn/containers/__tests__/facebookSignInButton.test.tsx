import { fireEvent, render, waitFor } from '@testing-library/react-native'
import * as FacebookSession from 'expo-auth-session/providers/facebook'
import * as FacebookNative from 'expo-facebook'
import * as FirebaseAuth from 'firebase/auth'
import { mocked } from 'jest-mock'
import { useState } from 'react'

import AppMockingProvider from '@/mock/components/AppMockingProvider'
import { getPlatform } from '@/utils/native'

import FacebookSignInButtonHOC from '../FacebookButton'

jest.mock('firebase/auth')
jest.mock('expo-auth-session')
jest.mock('expo-facebook')
jest.mock('expo-auth-session/providers/facebook')
jest.mock('@/utils/native')

it('signs the user into Firebase when valid FB account provided on web', async () => {
    const TEST_TOKEN = 'test-token'

    const mGetPlatform = mocked(getPlatform)
    const mFirebaseAuth = mocked(FirebaseAuth, true)
    const mFacebookSession = mocked(FacebookSession)
    const mPromptAsync = jest.fn()

    mGetPlatform.mockReturnValue({ OS: 'web' } as any)
    mFacebookSession.useAuthRequest.mockImplementation((): any => {
        const [response, setResponse] = useState<any>(null)

        mPromptAsync.mockImplementation(() => {
            setResponse({
                type: 'success',
                params: { access_token: TEST_TOKEN }
            })
        })

        return [{}, response, mPromptAsync]
    })
    const { findByRole } = render(
        <AppMockingProvider>
            <FacebookSignInButtonHOC />
        </AppMockingProvider>
    )

    const TEST_CREDENTIAL = 'test-credential'
    mFirebaseAuth.FacebookAuthProvider.credential.mockReturnValue(
        TEST_CREDENTIAL as any
    )
    const fbButton = await findByRole('button')
    fireEvent.press(fbButton)
    await waitFor(() => {
        expect(mPromptAsync).toHaveBeenCalledWith()
        expect(
            mFirebaseAuth.FacebookAuthProvider.credential
        ).toHaveBeenCalledWith(TEST_TOKEN)
        expect(mFirebaseAuth.signInWithCredential).toHaveBeenCalledWith(
            mFirebaseAuth.getAuth(),
            TEST_CREDENTIAL
        )
    })
})

it('signs the user into Firebase when valid FB account provided on mobile', async () => {
    const TEST_TOKEN = 'test-token'

    const mGetPlatform = mocked(getPlatform)
    const mFirebaseAuth = mocked(FirebaseAuth, true)
    const mFacebookSession = mocked(FacebookSession, true)
    const mFacebookNative = mocked(FacebookNative, true)

    mGetPlatform.mockReturnValue({ OS: 'ios' } as any)
    mFacebookSession.useAuthRequest.mockImplementation((): any => [
        {},
        null,
        jest.fn()
    ])

    const { findByRole } = render(
        <AppMockingProvider>
            <FacebookSignInButtonHOC />
        </AppMockingProvider>
    )

    const TEST_CREDENTIAL = 'test-credential'
    mFacebookNative.logInWithReadPermissionsAsync.mockResolvedValue({
        type: 'success',
        token: TEST_TOKEN
    } as any)
    mFirebaseAuth.FacebookAuthProvider.credential.mockReturnValue(
        TEST_CREDENTIAL as any
    )
    const fbButton = await findByRole('button')
    fireEvent.press(fbButton)
    await waitFor(() => {
        expect(mFacebookNative.logInWithReadPermissionsAsync).toHaveBeenCalled()
        expect(
            mFirebaseAuth.FacebookAuthProvider.credential
        ).toHaveBeenCalledWith(TEST_TOKEN)
        expect(mFirebaseAuth.signInWithCredential).toHaveBeenCalledWith(
            mFirebaseAuth.getAuth(),
            TEST_CREDENTIAL
        )
    })
})
