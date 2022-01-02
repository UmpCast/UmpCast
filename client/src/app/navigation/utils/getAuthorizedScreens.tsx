import { Text } from 'native-base'
import { AuthState } from '@/app/generated-types'
import * as SignIn from '@/app/signin'
import { SignInRoutes } from '@/app/signin/utils/signInNavigation'
import AppStack from '../components/AppStack'

export default function getAuthorizedScreens(authState: AuthState) {
    const renderedScreens = []
    switch (authState) {
        case AuthState.Authenticated:
            renderedScreens.push(
                <AppStack.Screen
                    component={() => <Text>Authenticated</Text>}
                    name="Authenticated"
                    key="Authenticated"
                />
            )
            break
        case AuthState.Unregistered:
            renderedScreens.push(
                <AppStack.Screen
                    component={() => <Text>Unregistered</Text>}
                    name="Unregistered"
                    key="Unregistered"
                />
            )
            break
        case AuthState.Unauthenticated:
        default:
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
            break
    }

    return renderedScreens
}
