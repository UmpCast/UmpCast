import React, { useState } from 'react'

import { MockedProvider } from '@apollo/client/testing'
import { fireEvent, render, waitFor } from '@testing-library/react-native'
import { AuthSessionResult } from 'expo-auth-session'
import { useAuthRequest } from 'expo-auth-session/providers/google'

import AppCache, { authenticationVar } from 'apollo/appCache'
import MockAppProvider from 'utils/__mocks__/mockAppProvider'

import LoginScreen from '../containers/loginScreen'
import { SOCIAL_AUTH } from '../graphql/mutations/socialAuth'


jest.mock('expo-auth-session/providers/google', () => ({
    __esModule: true,
    useAuthRequest: jest.fn()
}))
const mockUseAuthRequest = useAuthRequest as jest.Mock

it('logs the user in when google social auth selected & completed', async () => {
    const mockPromptAsync = jest.fn()
    mockUseAuthRequest.mockImplementation(
        // @ts-ignore
        () => {
            const [response, setResponse] = useState<AuthSessionResult | null>(
                null
            )

            return [true, response, () => mockPromptAsync(setResponse)]
        }
    )
    const mocks = [
        {
            request: {
                query: SOCIAL_AUTH,
                variables: {
                    provider: 'google',
                    accessToken: 'my-google-access-token'
                }
            },
            result: jest.fn()
        }
    ]

    mocks[0].result.mockReturnValueOnce({
        data: {
            socialAuth: {
                token: 'my-access-token',
                refreshToken: 'my-refresh-token'
            }
        }
    })
    mockPromptAsync.mockImplementationOnce((setResponse) =>
        setResponse({
            type: 'success',
            // @ts-ignore
            authentication: {
                accessToken: 'my-google-access-token'
            }
        })
    )

    const { getByText } = render(
        <MockAppProvider>
            <MockedProvider mocks={mocks} cache={AppCache}>
                <LoginScreen />
            </MockedProvider>
        </MockAppProvider>
    )

    fireEvent.press(getByText('Login with Google'))

    await waitFor(() =>
        expect(authenticationVar()).toEqual({
            accessToken: 'my-access-token',
            refreshToken: 'my-refresh-token'
        })
    )

    expect(mocks[0].result).toHaveBeenCalled()
    expect(mockPromptAsync).toHaveBeenCalledTimes(1)
})
