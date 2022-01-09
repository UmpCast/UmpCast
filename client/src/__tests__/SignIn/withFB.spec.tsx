import AppMockingProvider from '@/components/MockAppProvider'
import SignInWithFBButton from '@/components/SignInWithFBButton'
import { firebaseAuth, facebookNative } from '@/mocks/environments/mocked'
import setupSignInFB from '@/mocks/environments/setupSignInFB'
import buildAuth from '@/mocks/factories/buildAuth'
import { TestRenderOptions } from '@/types/render'
import urqlMockingClient from '@/utils/urql'
import { act, fireEvent, render, waitFor } from '@testing-library/react-native'

jest.mock('firebase/auth')
jest.mock('expo-facebook')
jest.mock('expo-auth-session/providers/facebook')
jest.mock('@/utils/native')

it('signs the user into Firebase when valid FB account provided on web', async () => {
    const { AUTH } = buildWithFB()

    const { promptAsync } = setupSignInFB({
        platform: 'web',
        sessionHook: 'success',
        accessToken: AUTH.accessToken,
        credential: AUTH.credential
    })

    const { clickContinue } = renderWithFB()

    await act(clickContinue)

    await waitFor(() => {
        expect(promptAsync).toBeCalled()
        expect(firebaseAuth.FacebookAuthProvider.credential).toBeCalledWith(
            AUTH.accessToken
        )
        expect(firebaseAuth.signInWithCredential).toBeCalledWith(
            firebaseAuth.getAuth(),
            AUTH.credential
        )
    })
})

it('signs the user into Firebase when valid FB account provided on mobile', async () => {
    const { AUTH } = buildWithFB()

    setupSignInFB({
        platform: 'ios',
        accessToken: AUTH.accessToken,
        credential: AUTH.credential
    })

    const { clickContinue } = renderWithFB({})

    await act(clickContinue)

    await waitFor(() => {
        expect(facebookNative.logInWithReadPermissionsAsync).toBeCalled()
        expect(firebaseAuth.FacebookAuthProvider.credential).toBeCalledWith(
            AUTH.accessToken
        )
        expect(firebaseAuth.signInWithCredential).toBeCalledWith(
            firebaseAuth.getAuth(),
            AUTH.credential
        )
    })
})

export function buildWithFB() {
    const auth = buildAuth()

    return {
        AUTH: auth
    }
}

export function renderWithFB({ resolvers }: TestRenderOptions<'default'> = {}) {
    const client = urqlMockingClient({ resolvers })

    const utils = render(
        <AppMockingProvider client={client}>
            <SignInWithFBButton />
        </AppMockingProvider>
    )
    const clickContinue = async () =>
        fireEvent.press(await utils.findByText(/continue with facebook/i))

    return {
        clickContinue,
        ...utils
    }
}
