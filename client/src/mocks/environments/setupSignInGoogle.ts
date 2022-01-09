import { useState } from 'react'
import { googleSession, firebaseAuth } from './mocked'

export const setupSignInGoogle = ({
    idToken,
    credential
}: {
    idToken: string
    credential: string
}) => {
    const promptAsync = jest.fn()

    googleSession.useIdTokenAuthRequest.mockImplementation((): any => {
        const [response, setResponse] = useState<any>(null)

        promptAsync.mockImplementation(() => {
            setResponse({
                type: 'success',
                params: { id_token: idToken }
            })
        })

        return [{}, response, promptAsync]
    })

    firebaseAuth.GoogleAuthProvider.credential.mockReturnValue(
        credential as any
    )

    return {
        promptAsync
    }
}
