import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { SignInParams } from './models/signInParams'

export enum RootStackRoutes {
    SignIn = 'SignIn',
    SignInEmailSent = 'SignInEmailSent',
    SignInLinkRedirect = 'SignInLinkRedirect',
    SignInLinkRedirectAlt = 'SignInLinkRedirectAlt',
    Register = 'Register',
    Home = 'Home'
}

export type RootStackParamList = {
    [RootStackRoutes.SignIn]: undefined
    [RootStackRoutes.SignInEmailSent]: {
        email: string
    }
    [RootStackRoutes.SignInLinkRedirectAlt]: SignInParams
    [RootStackRoutes.SignInLinkRedirect]: SignInParams
    [RootStackRoutes.Register]: undefined
    [RootStackRoutes.Home]: undefined
}

const RootStack = createNativeStackNavigator<RootStackParamList>()

export default RootStack