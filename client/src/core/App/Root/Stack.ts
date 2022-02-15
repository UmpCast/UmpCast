import { NavigatorScreenParams } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import { SignInParams } from '../../Auth/models'
import { AppBottomTabParamList } from '../Bottom/Tabs'

export enum RootStackRoutes {
    AuthSignIn = 'AuthSignIn',
    AuthEmailSent = 'AuthEmailSent',
    AuthEmailReceiveLink = 'AuthEmailReceiveLink',
    AuthEmailReceiveLinkAlt = 'AuthEmailReceiveLinkAlt',
    Register = 'Register',
    Home = 'Home',
    SeasonStructure = 'SeasonStructure',
    PositionCreate = 'PositionCreate',
    DivisionCreate = 'DivisionCreate',
    OrgCreate = 'OrgCreate',
    OrgEdit = 'OrgEdit'
}

export type RootStackParamList = {
    [RootStackRoutes.AuthSignIn]: undefined
    [RootStackRoutes.AuthEmailSent]: {
        email: string
    }
    [RootStackRoutes.AuthEmailReceiveLinkAlt]: SignInParams
    [RootStackRoutes.AuthEmailReceiveLink]: SignInParams
    [RootStackRoutes.Register]: undefined
    [RootStackRoutes.Home]: NavigatorScreenParams<AppBottomTabParamList>
    [RootStackRoutes.SeasonStructure]: {
        seasonId: string
    }
    [RootStackRoutes.PositionCreate]: {
        divisionId: string
    }
    [RootStackRoutes.DivisionCreate]: {
        seasonId: string
    }
    [RootStackRoutes.OrgCreate]: undefined
    [RootStackRoutes.OrgEdit]: {
        id: string
    }
}

export const RootStack = createStackNavigator<RootStackParamList>()
