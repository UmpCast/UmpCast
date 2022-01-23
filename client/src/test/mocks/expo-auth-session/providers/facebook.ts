import * as facebook from 'expo-auth-session/providers/facebook'
import { mocked } from 'jest-mock'
import { useState } from 'react'
const mFacebook = mocked(facebook, true)

type AuthRequestOptions =
    | { type: 'success'; accessToken: string }
    | { type: 'default' }

function useAuthRequest(options: AuthRequestOptions) {
    switch (options.type) {
        case 'success':
            {
                const { accessToken } = options

                mFacebook.useAuthRequest.mockImplementation((): any => {
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
            mFacebook.useAuthRequest.mockImplementation((): any => [
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
    ...facebook
}
