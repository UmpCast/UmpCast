import { fireEvent, render, waitFor } from '@testing-library/react-native'

import MockAppProvider from '@/test/components/MockAppProvider'
import Auth from '@/test/factories/AuthFactory'
import facebook from '@/test/mocks/expo-auth-session/providers/facebook'
import expoFacebook from '@/test/mocks/expo-facebook'
import auth from '@/test/mocks/firebase/auth'
import native from '@/test/mocks/native'

import FBButton from './FBButton'

jest.mock('@/utils/native')
jest.mock('expo-auth-session/providers/facebook')
jest.mock('expo-facebook')
jest.mock('firebase/auth')

const setup = () => render(<FBButton />, { wrapper: MockAppProvider })

it.each`
    platform
    ${'web'}
    ${'mobile'}
`(
    'should sign the user in when auth succeeds on $platform',
    async ({ platform }) => {
        const AUTH = Auth.Response()

        native.getPlatform.mockReturnValue({
            OS: platform === 'web' ? 'web' : 'ios'
        } as any)

        if (platform === 'web') {
            facebook.mock.useAuthRequest({
                type: 'success',
                accessToken: AUTH.accessToken
            })
        } else if (platform === 'mobile') {
            facebook.mock.useAuthRequest({
                type: 'default'
            })
            expoFacebook.logInWithReadPermissionsAsync.mockResolvedValue({
                type: 'success',
                token: AUTH.accessToken
            } as any)
        }

        const utils = setup()
        const facebookbutton = await utils.findByText(/continue with facebook/i)

        // Facebook button pressed & user does auth exchange
        auth.FacebookAuthProvider.credential.mockReturnValue(
            AUTH.credential as any
        )

        fireEvent.press(facebookbutton)

        await waitFor(() => {
            expect(auth.FacebookAuthProvider.credential).toBeCalledWith(
                AUTH.accessToken
            )
            expect(auth.signInWithCredential).toBeCalledWith(
                auth.getAuth(),
                AUTH.credential
            )
        })
    }
)
