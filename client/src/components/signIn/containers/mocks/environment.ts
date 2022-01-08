import { useState } from 'react'
import faker from 'faker'
import {
    nativeUtils,
    facebookSession,
    firebaseAuth,
    facebookNative,
    googleSession
} from '@/utils/mock'
import { EMAIL_SIGN_IN_KEY } from '@/constants'
import AsyncStorage from '@react-native-async-storage/async-storage'

export const emailForm = () => {}

export const emailReceived = ({
    email,
    stored = false,
    properSignIn
}: {
    email: string
    stored?: boolean
    properSignIn?: {
        triggerAuthStateChange: (auth: boolean) => void
    }
}) => {
    if (stored) AsyncStorage.setItem(EMAIL_SIGN_IN_KEY, email)

    if (properSignIn) {
        firebaseAuth.signInWithEmailLink.mockImplementation((): any => {
            properSignIn.triggerAuthStateChange(true)
        })
    }
}

export const facebookButton = ({
    platform = 'ios',
    accessToken = faker.datatype.uuid(),
    credential = faker.datatype.uuid(),
    sessionHook = undefined
}: {
    platform?: string
    accessToken?: string
    credential?: string
    sessionHook?: 'success'
}) => {
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

export const googleButton = ({
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
