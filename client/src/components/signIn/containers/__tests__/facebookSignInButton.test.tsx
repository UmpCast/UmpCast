import { IMocks } from '@graphql-tools/mock'
import { fireEvent, render, waitFor } from '@testing-library/react-native'
import * as FacebookSession from 'expo-auth-session/providers/facebook'
import * as FacebookNative from 'expo-facebook'
import * as FirebaseAuth from 'firebase/auth'
import { mocked } from 'jest-mock'
import { useState } from 'react'

import { AuthState } from '@/apollo/generated'
import AppMockingProvider from '@/mock/components/AppMockingProvider'
import { getPlatform } from '@/utils/nativeUtils'
import { getAuthState } from '@/utils/testUtils'

import FacebookButtonContainer from '../FacebookButtonContainer'

jest.mock('firebase/auth')
jest.mock('expo-auth-session')
jest.mock('expo-facebook')
jest.mock('expo-auth-session/providers/facebook')
jest.mock('@/utils/nativeUtils')

const setup = (mocks: IMocks = {}) => {
    const accessToken = 'test-token'

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
                params: { access_token: accessToken }
            })
        })

        return [{}, response, mPromptAsync]
    })

    const credential = 'test-credential'
    mFirebaseAuth.FacebookAuthProvider.credential.mockReturnValue(
        credential as any
    )

    const utils = render(
        <AppMockingProvider mocks={mocks}>
            <FacebookButtonContainer />
        </AppMockingProvider>
    )

    return {
        mGetPlatform,
        mFirebaseAuth,
        mFacebookSession,
        mPromptAsync,
        accessToken,
        credential,
        ...utils
    }
}

it('signs the user into Firebase when valid FB account provided on web', async () => {
    const { mFirebaseAuth, mPromptAsync, accessToken, credential, findByRole } =
        setup()

    const fbButton = await findByRole('button')
    fireEvent.press(fbButton)

    await waitFor(() => {
        expect(mPromptAsync).toHaveBeenCalledWith()
        expect(
            mFirebaseAuth.FacebookAuthProvider.credential
        ).toHaveBeenCalledWith(accessToken)
        expect(mFirebaseAuth.signInWithCredential).toHaveBeenCalledWith(
            mFirebaseAuth.getAuth(),
            credential
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
            <FacebookButtonContainer />
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

it('sends the user to registration when unregistered', async () => {
    const { findByRole } = setup({
        Query: () => ({
            me: null
        })
    })

    const fbButton = await findByRole('button')
    fireEvent.press(fbButton)

    await waitFor(async () => {
        expect(getAuthState()).toBe(AuthState.Unregistered)
    })
})

it('sends the user to home when registered', async () => {
    const { findByRole } = setup()

    const fbButton = await findByRole('button')
    fireEvent.press(fbButton)

    await waitFor(async () => {
        expect(getAuthState()).toBe(AuthState.Authenticated)
    })
})
