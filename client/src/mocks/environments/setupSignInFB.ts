import faker from 'faker'
import { useState } from 'react'
import {
    nativeUtils,
    facebookSession,
    firebaseAuth,
    facebookNative
} from './mocked'

export default function seuptSignInFB({
    platform = 'ios',
    accessToken = faker.datatype.uuid(),
    credential = faker.datatype.uuid(),
    sessionHook = undefined
}: {
    platform?: string
    accessToken?: string
    credential?: string
    sessionHook?: 'success'
}) {
    const promptAsync = jest.fn()

    nativeUtils.getPlatform.mockReturnValue({ OS: platform } as never)

    switch (sessionHook) {
        case 'success':
            facebookSession.useAuthRequest.mockImplementation((): any => {
                const [response, setResponse] = useState<any>(null)

                promptAsync.mockImplementation(() => {
                    setResponse({
                        type: 'success',
                        params: { access_token: accessToken }
                    })
                })

                return [{}, response, promptAsync]
            })
            break
        default:
            facebookSession.useAuthRequest.mockImplementation((): any => [
                {},
                null,
                jest.fn()
            ])
    }

    firebaseAuth.FacebookAuthProvider.credential.mockReturnValue(
        credential as any
    )

    facebookNative.logInWithReadPermissionsAsync.mockResolvedValue({
        type: 'success',
        token: accessToken
    } as any)

    return {
        promptAsync
    }
}
