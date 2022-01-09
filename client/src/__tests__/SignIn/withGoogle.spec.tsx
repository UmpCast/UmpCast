import AppMockingProvider from '@/components/MockAppProvider'
import SignInWithGoogleButton from '@/components/SignInWithGoogleButton'
import { firebaseAuth } from '@/mocks/environments/mocked'
import { setupSignInGoogle } from '@/mocks/environments/setupSignInGoogle'
import buildAuth from '@/mocks/factories/buildAuth'
import { TestRenderOptions } from '@/types/render'
import urqlMockingClient from '@/utils/urql'
import { act, fireEvent, render, waitFor } from '@testing-library/react-native'

jest.mock('expo-auth-session/providers/google')
jest.mock('firebase/auth')

it('signs the user into Firebase when valid Google account provided', async () => {
    const { AUTH } = buildWithGoogle()

    const { promptAsync } = setupSignInGoogle({
        idToken: AUTH.idToken,
        credential: AUTH.credential
    })

    const { clickContinue } = renderWithGoogle({})

    await act(clickContinue)

    await waitFor(() => {
        expect(promptAsync).toHaveBeenCalledWith()
        expect(firebaseAuth.GoogleAuthProvider.credential).toHaveBeenCalledWith(
            AUTH.idToken
        )
        expect(firebaseAuth.signInWithCredential).toHaveBeenCalledWith(
            firebaseAuth.getAuth(),
            AUTH.credential
        )
    })
})

export function buildWithGoogle() {
    const auth = buildAuth()

    return {
        AUTH: auth
    }
}

export function renderWithGoogle({ resolvers }: TestRenderOptions<'default'>) {
    const client = urqlMockingClient({ resolvers })

    const utils = render(
        <AppMockingProvider client={client}>
            <SignInWithGoogleButton />
        </AppMockingProvider>
    )

    const clickContinue = async () =>
        fireEvent.press(await utils.findByText(/continue with google/i))

    return {
        clickContinue,
        ...utils
    }
}
