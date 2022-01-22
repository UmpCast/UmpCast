import Route from '@/tests/factories/RouteFactory'
import { createRender } from '@/tests/setup'
import SignInLinkEntry from '.'
import { waitFor } from '@testing-library/react-native'
import auth from '@/tests/mocks/firebase/auth'
import { getURLParams } from '@/utils/web'
import { EMAIL_SIGN_IN_KEY } from '@/constants'
import asyncStorage from '@/tests/mocks/@react-native-async-storage/async-storage'

jest.mock('firebase/auth')

it('should sign user in when link valid', async () => {
    const STORED_EMAIL = 'stored@gmail.com'
    const PARAMS = Route.signInParams()

    asyncStorage.getItem.mockResolvedValue(STORED_EMAIL)

    createRender(() => <SignInLinkEntry params={PARAMS} />)

    await waitFor(() => {
        expect(asyncStorage.getItem).toBeCalledWith(EMAIL_SIGN_IN_KEY)
        expect(auth.signInWithEmailLink).toHaveBeenCalledWith(
            auth.getAuth(),
            STORED_EMAIL,
            expect.anything()
        )
        const returnUrl = new URL(
            auth.signInWithEmailLink.mock.calls[0][2] ?? ''
        )
        expect(getURLParams(returnUrl)).toMatchObject(PARAMS)
    })
})
