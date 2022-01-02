import { AuthState } from '@/app/generated-types'
import * as SignIn from '@/app/signin'
import { SignInRoutes } from '@/app/signin/utils/signInNavigation'
import AppStack from '../components/AppStack'
import { Text } from 'native-base'

export default function getAuthorizedScreens(authState: AuthState) {
    const renderedScreens = []
    switch (authState) {
        case AuthState.Unauthenticated:
            renderedScreens.push(
                ...[
                    <AppStack.Screen
                        component={SignIn.Screens.Main}
                        name={SignInRoutes.SignIn}
                        key={SignInRoutes.SignIn}
                    />,
                    <AppStack.Screen
                        component={SignIn.Screens.EmailSent}
                        name={SignInRoutes.EmailSignInSent}
                        key={SignInRoutes.EmailSignInSent}
                    />,
                    <AppStack.Screen
                        component={SignIn.Screens.EmailReceived}
                        name={SignInRoutes.EmailSignInRecievedAlt}
                        key={SignInRoutes.EmailSignInRecievedAlt}
                    />,
                    <AppStack.Screen
                        component={SignIn.Screens.EmailReceived}
                        name={SignInRoutes.EmailSignInRecieved}
                        key={SignInRoutes.EmailSignInRecieved}
                    />
                ]
            )

        case AuthState.Unregistered:
            renderedScreens.push(
                <AppStack.Screen
                    component={() => <Text>Unregistered</Text>}
                    name={'Unregistered'}
                    key={'Unregistered'}
                />
            )
        case AuthState.Authenticated:
            renderedScreens.push(
                <AppStack.Screen
                    component={() => <Text>Authenticated</Text>}
                    name={'Authenticated'}
                    key={'Authenticated'}
                />
            )
    }

    return renderedScreens
}
