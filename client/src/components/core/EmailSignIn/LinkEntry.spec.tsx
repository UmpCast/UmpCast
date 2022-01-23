import { EMAIL_SIGN_IN_KEY } from '@/constants'
import RouteFactory from '@/test/factories/RouteFactory'
import asyncStorage from '@/test/mocks/@react-native-async-storage/async-storage'
import auth from '@/test/mocks/firebase/auth'
import { createRender } from '@/test/setup'
import { getURLParams } from '@/utils/web'
import { waitFor } from '@testing-library/react-native'
import LinkEntry from './LinkEntry'

jest.mock('firebase/auth')

it('should sign user in when link valid', async () => {
    const STORED_EMAIL = 'stored@gmail.com'
    const PARAMS = RouteFactory.signInParams()

    asyncStorage.getItem.mockResolvedValue(STORED_EMAIL)

    createRender(() => <LinkEntry params={PARAMS} />)

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
