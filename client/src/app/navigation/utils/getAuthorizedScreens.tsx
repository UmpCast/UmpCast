import { AuthState } from '@/app/generated-types'
import Public from '@/app/public'
import SignIn from '@/app/signin'
import AppStack from '../components/AppStack'

const AuthSpecificScreens: Record<AuthState, JSX.Element[]> = {
    [AuthState.Authenticated]: [],
    [AuthState.Unregistered]: [],
    [AuthState.Unauthenticated]: [SignIn.getSignInGroup(AppStack)]
}

export default function getAuthorizedScreens(authState: AuthState) {
    return [Public.getPublicGroup(AppStack), ...AuthSpecificScreens[authState]]
}
