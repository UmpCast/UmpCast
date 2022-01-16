import * as FirebaseAuth from 'firebase/auth'
import { mocked } from 'jest-mock'

const firebaseAuth = mocked(FirebaseAuth, true)

interface TriggerAuthStateChangedOptions {
    hasAuth: boolean
}

function onAuthStateChanged() {
    const mockOnAuthStateChanged = jest.fn()

    const listenForCallback = () => {
        firebaseAuth.getAuth.mockReturnValue({
            onAuthStateChanged: mockOnAuthStateChanged
        } as any)
    }

    const triggerAuthStateChanged = ({ hasAuth }: { hasAuth: boolean }) => {
        mockOnAuthStateChanged.mock.calls[0][0](hasAuth ? {} : null)
    }

    return {
        listenForCallback,
        triggerAuthStateChanged
    }
}

function signInWithEmailLink({
    triggerAuthStateChanged
}: {
    type: 'success'
    triggerAuthStateChanged: (options: TriggerAuthStateChangedOptions) => void
}) {
    firebaseAuth.signInWithEmailLink.mockImplementation((): any => {
        triggerAuthStateChanged({
            hasAuth: true
        })
    })
}

function signInWithCredential({
    triggerAuthStateChanged
}: {
    type: 'success'
    triggerAuthStateChanged: (options: TriggerAuthStateChangedOptions) => void
}) {
    firebaseAuth.signInWithCredential.mockImplementation((): any => {
        triggerAuthStateChanged({
            hasAuth: true
        })
    })
}

function authProviderCredential({
    provider,
    credential
}: {
    provider: 'google' | 'facebook'
    credential: string
}) {
    switch (provider) {
        case 'google':
            firebaseAuth.GoogleAuthProvider.credential.mockReturnValue(
                credential as any
            )
            break
        case 'facebook':
            firebaseAuth.FacebookAuthProvider.credential.mockReturnValue(
                credential as any
            )
            break
        default:
            break
    }
}

export default {
    mock: {
        onAuthStateChanged,
        signInWithEmailLink,
        authProviderCredential,
        signInWithCredential
    },
    ...firebaseAuth
}
