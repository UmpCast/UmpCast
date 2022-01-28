import { createStackNavigator } from '@react-navigation/stack'

import { SignInParams } from './core/Auth/models'
import { loadAppExtra } from './utils/expo'

export enum RootStackRoutes {
    AuthSignIn = 'AuthSignIn',
    AuthEmailSent = 'AuthEmailSent',
    AuthEmailReceiveLink = 'AuthEmailReceiveLink',
    AuthEmailReceiveLinkAlt = 'AuthEmailReceiveLinkAlt',
    Register = 'Register',
    Home = 'Home',
    SeasonStructure = 'SeasonStructure',
    PositionCreate = 'PositionCreate',
    DivisionCreate = 'DivisionCreate'
}

export type RootStackParamList = {
    [RootStackRoutes.AuthSignIn]: undefined
    [RootStackRoutes.AuthEmailSent]: {
        email: string
    }
    [RootStackRoutes.AuthEmailReceiveLinkAlt]: SignInParams
    [RootStackRoutes.AuthEmailReceiveLink]: SignInParams
    [RootStackRoutes.Register]: undefined
    [RootStackRoutes.Home]: undefined
    [RootStackRoutes.SeasonStructure]: {
        seasonId: string
    }
    [RootStackRoutes.PositionCreate]: {
        divisionId: string
    }
    [RootStackRoutes.DivisionCreate]: {
        seasonId: string
    }
}

export const RootStack = createStackNavigator<RootStackParamList>()

export const navigationConfig = {
    screens: {
        [RootStackRoutes.AuthSignIn]: 'sign-in',
        [RootStackRoutes.AuthEmailSent]: 'email/sent',
        [RootStackRoutes.AuthEmailReceiveLinkAlt]: '__/auth/action',
        [RootStackRoutes.AuthEmailReceiveLink]: 'email/link',
        [RootStackRoutes.Register]: 'register',
        [RootStackRoutes.Home]: 'home',
        [RootStackRoutes.SeasonStructure]: 'season/structure',
        [RootStackRoutes.PositionCreate]: 'position/create',
        [RootStackRoutes.DivisionCreate]: 'division/create'
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
