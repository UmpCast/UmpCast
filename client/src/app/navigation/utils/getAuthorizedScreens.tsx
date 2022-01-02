import { AuthState } from '@/app/generated-types'
import Public from '@/app/public'
import SignIn from '@/app/signin'
import AppStack from '../components/AppStack'
import { Text } from 'native-base'
import { TempRoutes } from './tempNavigation'

const AuthenticatedComponent = () => <Text>Authenticated</Text>
const UnregisteredComponent = () => <Text>Unregistered</Text>

const AuthSpecificScreens: Record<AuthState, JSX.Element[]> = {
    [AuthState.Authenticated]: [
        <AppStack.Screen
            component={AuthenticatedComponent}
            name={TempRoutes.Authenticated}
            key={TempRoutes.Authenticated}
        />
    ],
    [AuthState.Unregistered]: [
        <AppStack.Screen
            component={UnregisteredComponent}
            name={TempRoutes.Unregistered}
            key={TempRoutes.Unregistered}
        />
    ],
    [AuthState.Unauthenticated]: [SignIn.getSignInGroup(AppStack)]
}

export default function getAuthorizedScreens(authState: AuthState) {
    return [Public.getPublicGroup(AppStack), ...AuthSpecificScreens[authState]]
}
