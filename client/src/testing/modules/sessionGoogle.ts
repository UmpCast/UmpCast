import * as Google from 'expo-auth-session/providers/google'
import { mocked } from 'jest-mock'
import { useState } from 'react'

const _ = mocked(Google, true)

type useIdTokenRequestOptions =
    | { type: 'success'; idToken: string }
    | { type: 'default' }

function useIdTokenAuthRequest(options: useIdTokenRequestOptions) {
    const promptAsync = jest.fn()

    switch (options.type) {
        case 'success':
            _.useIdTokenAuthRequest.mockImplementation((): any => {
                const [response, setResponse] = useState<any>(null)

                promptAsync.mockImplementation(() => {
                    setResponse({
                        type: 'success',
                        params: { id_token: options.idToken }
                    })
                })

                return [{}, response, promptAsync]
            })
            break
        case 'default':
        default:
            _.useIdTokenAuthRequest.mockImplementation((): any => [
                {},
                null,
                jest.fn()
            ])
    }

    return {
        promptAsync
    }
}

export default {
    mock: {
        useIdTokenAuthRequest
    },
    ..._
}
