import { render, waitFor } from '@testing-library/react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import * as firebaseAuth from 'firebase/auth'
import { mocked } from 'jest-mock'
import { EMAIL_SIGN_IN_KEY } from '../../utils/constants'
import EmailSignInReceivedHOC from '../EmailSignInRecieved'
import AppMockingProvider from '@/mock/components/AppMockingProvider'
import AppStack from '@/app/app/components/AppStack'
import {
    EmailSignInParamList,
    SignInRoutes
} from '../../utils/signInNavigation'

jest.mock('firebase/auth')

it('signs the user into Firebase when url path is valid', async () => {
    const mFirebaseAuth = mocked(firebaseAuth, true)

    const TEST_INITIAL_PARAMS: EmailSignInParamList = {
        apiKey: 'test-api-key',
        mode: 'signIn',
        oobCode: 'test-oob-code'
    }
    const TEST_EMAIL = 'test@gmail.com'
    AsyncStorage.setItem(EMAIL_SIGN_IN_KEY, TEST_EMAIL)

    render(
        <AppMockingProvider withNavigation>
            <AppStack.Navigator>
                <AppStack.Screen
                    component={EmailSignInReceivedHOC}
                    name={SignInRoutes.EmailSignInRecieved}
                    initialParams={TEST_INITIAL_PARAMS}
                />
            </AppStack.Navigator>
        </AppMockingProvider>
    )

    await waitFor(() => {
        expect(mFirebaseAuth.signInWithEmailLink).toHaveBeenCalledWith(
            mFirebaseAuth.getAuth(),
            TEST_EMAIL,
            expect.anything()
        )
        const sentLink =
            mFirebaseAuth.signInWithEmailLink.mock.calls[0][2] ?? ''

        const params: { [key: string]: string } = {}
        new URL(sentLink).searchParams.forEach((val, key) => {
            params[key] = val
        })
        expect(params).toMatchObject(TEST_INITIAL_PARAMS)
    })
})
