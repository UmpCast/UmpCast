import * as facebook from 'expo-auth-session/providers/facebook'
import { mocked } from 'jest-mock'
import { useState } from 'react'

const _ = mocked(facebook, true)

type AuthRequestOptions =
    | { type: 'success'; accessToken: string }
    | { type: 'default' }

export function useAuthRequest(options: AuthRequestOptions) {
    switch (options.type) {
        case 'success':
            {
                const { accessToken } = options

                _.useAuthRequest.mockImplementation((): any => {
                    const [response, setResponse] = useState<any>(null)

                    const promptAsync = () => {
                        setResponse({
                            type: 'success',
                            params: { access_token: accessToken }
                        })
                    }

                    return [{}, response, promptAsync]
                })
            }
            break
        case 'default':
        default:
            _.useAuthRequest.mockImplementation((): any => [
                {},
                null,
                jest.fn()
            ])
    }
}

export default {
    mock: {
        useAuthRequest
    },
    ..._
}
