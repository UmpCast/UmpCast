import { IMocks } from '@graphql-tools/mock'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { render, waitFor } from '@testing-library/react-native'
import * as firebaseAuth from 'firebase/auth'
import { mocked } from 'jest-mock'

import { AuthState } from '@/apollo/generated'
import { EMAIL_SIGN_IN_KEY } from '@/constants'
import AppMockingProvider from '@/mock/components/AppMockingProvider'
import RootStack, {
    EmailSignInParamList,
    RootStackRoutes
} from '@/navigation/rootStack'
import { getAuthState } from '@/utils/testUtils'

import EmailSignInReceivedHOC from '../EmailRecievedContainer'

jest.mock('firebase/auth')

const setupSuccessCase = (mocks: IMocks = {}) => {
    const initialParams: EmailSignInParamList = {
        apiKey: 'test-api-key',
        mode: 'signIn',
        oobCode: 'test-oob-code'
    }

    const email = 'test@gmail.com'

    const utils = render(
        <AppMockingProvider mocks={mocks} withNavigation>
            <RootStack.Navigator>
                <RootStack.Screen
                    component={EmailSignInReceivedHOC}
                    name={RootStackRoutes.SignInEmailRecieved}
                    initialParams={initialParams}
                />
            </RootStack.Navigator>
        </AppMockingProvider>
    )

    AsyncStorage.setItem(EMAIL_SIGN_IN_KEY, email)

    return {
        ...utils,
        initialParams,
        email
    }
}

it('signs the user into Firebase when params are valid', async () => {
    const mFirebaseAuth = mocked(firebaseAuth, true)

    const { email, initialParams } = setupSuccessCase()

    await waitFor(async () => {
        expect(mFirebaseAuth.signInWithEmailLink).toHaveBeenCalledWith(
            mFirebaseAuth.getAuth(),
            email,
            expect.anything()
        )

        const sentLink =
            mFirebaseAuth.signInWithEmailLink.mock.calls[0][2] ?? ''
        const params: { [key: string]: string } = {}
        new URL(sentLink).searchParams.forEach((val, key) => {
            params[key] = val
        })
        expect(params).toMatchObject(initialParams)
    })
})

it('sends the user to registration when unregistered', async () => {
    setupSuccessCase({
        Query: () => ({
            me: null
        })
    })

    await waitFor(() => expect(getAuthState()).toEqual(AuthState.Unregistered))
})

it('sends the user to home when registered', async () => {
    setupSuccessCase()

    await waitFor(() => expect(getAuthState()).toEqual(AuthState.Authenticated))
})
