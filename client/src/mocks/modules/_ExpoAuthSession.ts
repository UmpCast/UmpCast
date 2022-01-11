import * as Facebook from 'expo-auth-session/providers/facebook'
import * as Google from 'expo-auth-session/providers/google'
import { mocked } from 'jest-mock'
import { useState } from 'react'

export const mockFacebook = mocked(Facebook, true)
export const mockGoogle = mocked(Google, true)

type SessionHookOptions =
    | { type: 'success'; accessToken: string }
    | { type: 'filler' }

function useFacebookAuthRequest(options: SessionHookOptions) {
    switch (options.type) {
        case 'success': {
            const { accessToken } = options

            mockFacebook.useAuthRequest.mockImplementation((): any => {
                const [response, setResponse] = useState<any>(null)

                const promptAsync = () => {
                    setResponse({
                        type: 'success',
                        params: { access_token: accessToken }
                    })
                }

                return [{}, response, promptAsync]
            })
            break
        }
        default:
            mockFacebook.useAuthRequest.mockImplementation((): any => [
                {},
                null,
                jest.fn()
            ])
    }
}

function useGoogleAuthRequest({ idToken }: { idToken: string }) {
    const promptAsync = jest.fn()

    mockGoogle.useIdTokenAuthRequest.mockImplementation((): any => {
        const [response, setResponse] = useState<any>(null)

        promptAsync.mockImplementation(() => {
            setResponse({
                type: 'success',
                params: { id_token: idToken }
            })
        })

        return [{}, response, promptAsync]
    })

    return {
        promptAsync
    }
}

export const _Facebook = {
    mock: {
        useAuthRequest: useFacebookAuthRequest
    },
    ...mockFacebook
}

export const _Google = {
    mock: {
        useAuthRequest: useGoogleAuthRequest
    },
    ...mockGoogle
}
