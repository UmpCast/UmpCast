import { fireEvent, render, waitFor } from '@testing-library/react-native'

import AppMockProvider from '@/core/App/Mock/Provider'
import expoFacebook from '@/testing/modules/expoFacebook'
import firebaseAuth from '@/testing/modules/firebaseAuth'
import native from '@/testing/modules/native'
import sessionFacebook from '@/testing/modules/sessionFacebook'

import { AuthFactory } from '../factory'

import FacebookButton from './Button'

jest.mock('@/utils/native')
jest.mock('expo-auth-session/providers/facebook')
jest.mock('expo-facebook')
jest.mock('firebase/auth')

const setup = () => render(<FacebookButton />, { wrapper: AppMockProvider })

it.each`
    platform
    ${'web'}
    ${'mobile'}
`(
    'should sign the user in when auth succeeds on $platform',
    async ({ platform }) => {
        const authResponse = AuthFactory.response()

        native.getPlatform.mockReturnValue({
            OS: platform === 'web' ? 'web' : 'ios'
        } as any)

        if (platform === 'web') {
            sessionFacebook.mock.useAuthRequest({
                type: 'success',
                accessToken: authResponse.accessToken
            })
        } else if (platform === 'mobile') {
            sessionFacebook.mock.useAuthRequest({
                type: 'default'
            })
            expoFacebook.logInWithReadPermissionsAsync.mockResolvedValue({
                type: 'success',
                token: authResponse.accessToken
            } as any)
        }

        const utils = setup()
        const facebookbutton = await utils.findByText(/continue with facebook/i)

        // Facebook button pressed & user does auth exchange
        firebaseAuth.FacebookAuthProvider.credential.mockReturnValue(
            authResponse.credential as any
        )

        fireEvent.press(facebookbutton)

        await waitFor(() => {
            expect(firebaseAuth.FacebookAuthProvider.credential).toBeCalledWith(
                authResponse.accessToken
            )
            expect(firebaseAuth.signInWithCredential).toBeCalledWith(
                firebaseAuth.getAuth(),
                authResponse.credential
            )
        })
    }
)
