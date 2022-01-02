import { GenericStack } from '@/app/common/utils/types'
import EmailSignInReceived from '../containers/EmailSignInRecieved'
import EmailSignInSent from '../containers/EmailSignInSent'
import { SignInRoutes } from '../utils/signInNavigation'
import SignInView from './SignInView'

export default function getSignInGroup(Stack: GenericStack) {
    return (
        <Stack.Group
            screenOptions={{
                headerShown: true
            }}
            key="SignIn"
        >
            <Stack.Screen component={SignInView} name={SignInRoutes.SignIn} />
            <Stack.Screen
                component={EmailSignInSent}
                name={SignInRoutes.EmailSignInSent}
            />
            <Stack.Screen
                component={EmailSignInReceived}
                name={SignInRoutes.EmailSignInRecievedAlt}
            />
            <Stack.Screen
                component={EmailSignInReceived}
                name={SignInRoutes.EmailSignInRecieved}
            />
        </Stack.Group>
    )
}
