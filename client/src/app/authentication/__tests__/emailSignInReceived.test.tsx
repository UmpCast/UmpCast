import { render, waitFor } from '@testing-library/react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import * as firebaseAuth from 'firebase/auth'
import { mocked } from 'jest-mock'
import { EMAIL_SIGN_IN_KEY } from '../utils/constants'
import {
    EmailSignInParamList,
    UnauthRoutes,
    UnauthStack
} from '../containers/UnauthStack'
import EmailSignInReceivedHOC from '../containers/EmailSignInRecievedHOC'
import AppMockingProvider from '@/mock/components/AppMockingProvider'

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
            <UnauthStack.Navigator>
                <UnauthStack.Screen
                    component={EmailSignInReceivedHOC}
                    name={UnauthRoutes.EmailSignInRecieved}
                    initialParams={TEST_INITIAL_PARAMS}
                />
            </UnauthStack.Navigator>
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
