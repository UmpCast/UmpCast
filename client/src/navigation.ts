import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createStackNavigator } from '@react-navigation/stack'

import { SignInParams } from './models/signInParams'
import { loadAppExtra } from './utils/expo'

export enum RootStackRoutes {
    SignIn = 'SignIn',
    SignInEmailSent = 'SignInEmailSent',
    SignInLinkRedirect = 'SignInLinkRedirect',
    SignInLinkRedirectAlt = 'SignInLinkRedirectAlt',
    Register = 'Register',
    Home = 'Home',
    SeasonStructure = 'SeasonStructure',
    PositionCreate = 'PositionCreate'
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
    [RootStackRoutes.SeasonStructure]: undefined
    [RootStackRoutes.PositionCreate]: {
        divisionId: string
    }
}

export const RootStack = createStackNavigator<RootStackParamList>()

export const AuthStack = createBottomTabNavigator()

export const navigationConfig = {
    screens: {
        [RootStackRoutes.SignIn]: 'signin',
        [RootStackRoutes.SignInEmailSent]: 'email-sent',
        [RootStackRoutes.SignInLinkRedirectAlt]: '__/auth/action',
        [RootStackRoutes.SignInLinkRedirect]: 'email-received',
        [RootStackRoutes.Register]: 'register',
        [RootStackRoutes.Home]: 'home'
    }
}

export const navigationLinking = {
    prefixes: [
        loadAppExtra().APP_URL,
        loadAppExtra().FIREBASE_AUTH_URL,
        `${loadAppExtra().APP_SCHEME}://`
    ],
    config: navigationConfig
}
